import { NextRequest } from 'next/server';
import { verifyAndProcessPayment } from '@/lib/paymentHelpers';
import { errorResponse, successResponse } from '@/lib/middleware';

export async function POST(req: NextRequest) {
  try {
    const { orderId, razorpayPaymentId, razorpaySignature } = await req.json();
    if (!orderId || !razorpayPaymentId || !razorpaySignature) return errorResponse('Missing payment details');
    const result = await verifyAndProcessPayment({ orderId, razorpayPaymentId, razorpaySignature });
    return successResponse(result);
  } catch (error) { console.error('Verify payment error:', error); return errorResponse('Payment verification failed', 500); }
}
