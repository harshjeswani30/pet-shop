import Razorpay from 'razorpay';
import crypto from 'crypto';

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || '';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';

export const razorpay = new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET });
export function isRazorpayConfigured(): boolean { return !!RAZORPAY_KEY_ID && !!RAZORPAY_KEY_SECRET; }

export interface CreateOrderInput { amount: number; currency?: string; receipt?: string; notes?: Record<string, string>; }
export async function createRazorpayOrder(input: CreateOrderInput) {
  if (!isRazorpayConfigured()) throw new Error('Razorpay not configured');
  return razorpay.orders.create({ amount: input.amount, currency: input.currency || 'INR', receipt: input.receipt || `receipt_${Date.now()}`, notes: input.notes || {} });
}

export function verifyPaymentSignature(orderId: string, paymentId: string, signature: string): boolean {
  if (!RAZORPAY_KEY_SECRET) return false;
  const body = `${orderId}|${paymentId}`;
  const expected = crypto.createHmac('sha256', RAZORPAY_KEY_SECRET).update(body).digest('hex');
  return expected === signature;
}

export function verifyWebhookSignature(body: string, signature: string, secret: string): boolean {
  const expected = crypto.createHmac('sha256', secret).update(body).digest('hex');
  return expected === signature;
}

export async function fetchPayment(paymentId: string) { return razorpay.payments.fetch(paymentId); }
export async function createRefund(paymentId: string, amount?: number) {
  const options: { amount?: number } = {}; if (amount) options.amount = amount;
  return razorpay.payments.refund(paymentId, options);
}
export async function fetchRefund(refundId: string) { return razorpay.refunds.fetch(refundId); }

export function inrToPaise(amount: number): number { return Math.round(amount * 100); }
export function paiseToInr(amount: number): number { return amount / 100; }
export function calculateAmountWithGST(amount: number, gstRate: number = 18) { const tax = Math.round((amount * gstRate) / 100); return { subtotal: amount, tax, total: amount + tax }; }
export function generateOrderNumber(): string { return `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`; }
export function generateInvoiceNumber(): string { return `INV-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 4).toUpperCase()}`; }

export const paymentMethodNames: Record<string, string> = { card: 'Credit/Debit Card', netbanking: 'Net Banking', wallet: 'Wallet', emi: 'EMI', upi: 'UPI', paylater: 'Pay Later' };
export function getPaymentMethodName(method: string): string { return paymentMethodNames[method] || method; }

export type RazorpayWebhookEvent = 'payment.captured' | 'payment.failed' | 'refund.created' | 'refund.processed' | 'order.paid';
export interface RazorpayWebhookPayload {
  entity: 'event'; account_id: string; event: RazorpayWebhookEvent; contains: string[];
  payload: { payment?: { entity: { id: string; amount: number; currency: string; status: string; order_id: string; method: string; captured: boolean } }; refund?: { entity: { id: string; payment_id: string; amount: number; status: string } } };
  created_at: number;
}
