import { prisma } from './prisma';
import { createRazorpayOrder, verifyPaymentSignature, inrToPaise, calculateAmountWithGST, generateOrderNumber, generateInvoiceNumber, isRazorpayConfigured } from './razorpay';
import { sendPaymentReceiptEmail, sendOrderConfirmationEmail } from './emailService';
import { OrderStatus, PaymentStatus } from '@prisma/client';

export async function createOrderWithPayment({ petId, customerId, sellerId, subtotal, discount = 0, shippingAddress, notes, customerEmail, customerName, petName }: { petId: string; customerId: string; sellerId: string; subtotal: number; discount?: number; shippingAddress?: string; notes?: string; customerEmail: string; customerName: string; petName: string }) {
  const { subtotal: calcSubtotal, tax, total } = calculateAmountWithGST(subtotal - discount);
  const order = await prisma.order.create({ data: { orderNumber: generateOrderNumber(), petId, customerId, sellerId, subtotal: calcSubtotal, tax, discount, total, shippingAddress, notes, status: OrderStatus.PENDING, paymentStatus: PaymentStatus.PENDING } });
  const payment = await prisma.payment.create({ data: { orderId: order.id, amount: total, currency: 'INR', status: PaymentStatus.PENDING, receiptId: order.orderNumber } });
  let razorpayOrder = null;
  if (isRazorpayConfigured()) {
    try { razorpayOrder = await createRazorpayOrder({ amount: inrToPaise(total), currency: 'INR', receipt: order.orderNumber, notes: { orderId: order.id, customerId, sellerId } }); await prisma.payment.update({ where: { id: payment.id }, data: { razorpayOrderId: razorpayOrder.id } }); } catch (e) { console.error('Razorpay error:', e); }
  }
  await sendOrderConfirmationEmail(customerEmail, customerName, order.orderNumber, petName, total);
  return { order, payment, razorpayOrder };
}

export async function verifyAndProcessPayment({ orderId, razorpayPaymentId, razorpaySignature }: { orderId: string; razorpayPaymentId: string; razorpaySignature: string }) {
  const order = await prisma.order.findUnique({ where: { id: orderId }, include: { payment: true, customer: true, seller: true, pet: true } });
  if (!order || !order.payment) throw new Error('Order not found');
  if (!verifyPaymentSignature(order.payment.razorpayOrderId || '', razorpayPaymentId, razorpaySignature)) throw new Error('Invalid signature');
  const [updatedPayment, updatedOrder] = await Promise.all([
    prisma.payment.update({ where: { id: order.payment.id }, data: { razorpayPaymentId, signature: razorpaySignature, status: PaymentStatus.SUCCESS } }),
    prisma.order.update({ where: { id: orderId }, data: { status: OrderStatus.PAID, paymentStatus: PaymentStatus.SUCCESS } }),
    prisma.sellerProfile.update({ where: { id: order.sellerId }, data: { totalSales: { increment: 1 }, totalRevenue: { increment: order.total } } }),
    prisma.pet.update({ where: { id: order.petId }, data: { status: 'SOLD' } })
  ]);
  const invoice = await generateInvoice(order.id);
  await sendPaymentReceiptEmail(order.customer.email, order.customer.name, order.orderNumber, order.total, razorpayPaymentId);
  return { order: updatedOrder, payment: updatedPayment, invoice };
}

export async function generateInvoice(orderId: string) {
  const order = await prisma.order.findUnique({ where: { id: orderId }, include: { customer: true, seller: { include: { user: true } }, pet: { include: { breed: true, category: true } }, payment: true } });
  if (!order) throw new Error('Order not found');
  return prisma.invoice.create({ data: { orderId: order.id, invoiceNumber: generateInvoiceNumber() } });
}

export async function processRefund({ paymentId, amount, reason }: { paymentId: string; amount: number; reason: string }) {
  const payment = await prisma.payment.findUnique({ where: { id: paymentId }, include: { order: true } });
  if (!payment) throw new Error('Payment not found');
  const refund = await prisma.refund.create({ data: { paymentId, amount, reason, status: 'INITIATED' } });
  if (isRazorpayConfigured() && payment.razorpayPaymentId) {
    try { const { createRefund } = await import('./razorpay'); const rzRefund = await createRefund(payment.razorpayPaymentId, inrToPaise(amount)); await prisma.refund.update({ where: { id: refund.id }, data: { razorpayRefundId: rzRefund.id, status: rzRefund.status === 'processed' ? 'SUCCESS' : 'INITIATED', processedAt: rzRefund.status === 'processed' ? new Date() : null } }); } catch (e) { console.error('Refund error:', e); }
  }
  if (amount >= payment.amount) {
    await Promise.all([prisma.payment.update({ where: { id: paymentId }, data: { status: PaymentStatus.REFUNDED } }), prisma.order.update({ where: { id: payment.orderId }, data: { status: OrderStatus.CANCELLED, paymentStatus: PaymentStatus.REFUNDED } })]);
  }
  return refund;
}

export async function getOrderDetails(orderId: string) { return prisma.order.findUnique({ where: { id: orderId }, include: { customer: { select: { id: true, name: true, email: true, phone: true } }, seller: { include: { user: { select: { name: true, email: true } } } }, pet: { include: { breed: true, category: true, images: true } }, payment: true, invoice: true } }); }
export async function getUserOrders(userId: string) { return prisma.order.findMany({ where: { customerId: userId }, include: { pet: { include: { breed: true, category: true, images: { take: 1 } } }, seller: { select: { storeName: true } }, payment: true }, orderBy: { createdAt: 'desc' } }); }
export async function getSellerOrders(sellerId: string) { return prisma.order.findMany({ where: { sellerId }, include: { customer: { select: { name: true, email: true, phone: true } }, pet: { include: { breed: true, images: { take: 1 } } }, payment: true }, orderBy: { createdAt: 'desc' } }); }
export async function updateOrderStatus(orderId: string, status: OrderStatus) { return prisma.order.update({ where: { id: orderId }, data: { status } }); }
