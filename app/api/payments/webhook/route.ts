import { NextRequest } from 'next/server';
import { verifyWebhookSignature } from '@/lib/razorpay';
import { prisma } from '@/lib/prisma';

const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || '';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-razorpay-signature') || '';
    if (!verifyWebhookSignature(body, signature, WEBHOOK_SECRET)) return new Response('Invalid signature', { status: 400 });
    const event = JSON.parse(body);
    switch (event.event) {
      case 'payment.captured': {
        const payment = event.payload.payment?.entity;
        if (payment) { await prisma.payment.updateMany({ where: { razorpayOrderId: payment.order_id }, data: { razorpayPaymentId: payment.id, status: 'SUCCESS' } }); }
        break;
      }
      case 'payment.failed': {
        const payment = event.payload.payment?.entity;
        if (payment) { await prisma.payment.updateMany({ where: { razorpayOrderId: payment.order_id }, data: { status: 'FAILED' } }); }
        break;
      }
      case 'refund.processed': {
        const refund = event.payload.refund?.entity;
        if (refund) { await prisma.refund.updateMany({ where: { razorpayRefundId: refund.id }, data: { status: 'SUCCESS', processedAt: new Date() } }); }
        break;
      }
    }
    return new Response('OK', { status: 200 });
  } catch (error) { console.error('Webhook error:', error); return new Response('Error', { status: 500 }); }
}
