import { NextRequest } from 'next/server';
import { createOrderWithPayment } from '@/lib/paymentHelpers';
import { getUserFromToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { errorResponse, successResponse, extractToken } from '@/lib/middleware';

export async function POST(req: NextRequest) {
  try {
    const token = extractToken(req);
    if (!token) return errorResponse('Auth required', 401);
    const user = await getUserFromToken(token);
    if (!user) return errorResponse('Invalid token', 401);
    const body = await req.json();
    const { petId, shippingAddress, notes } = body;
    if (!petId) return errorResponse('Pet ID required');
    const pet = await prisma.pet.findUnique({ where: { id: petId }, include: { seller: true } });
    if (!pet) return errorResponse('Pet not found', 404);
    if (pet.status === 'SOLD') return errorResponse('Pet already sold', 400);
    const result = await createOrderWithPayment({ petId, customerId: user.id, sellerId: pet.sellerId, subtotal: pet.price, shippingAddress, notes, customerEmail: user.email, customerName: user.name, petName: pet.name });
    return successResponse(result);
  } catch (error) { console.error('Create order error:', error); return errorResponse('Failed to create order', 500); }
}
