import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/auth';
import { errorResponse, successResponse, extractToken } from '@/lib/middleware';

export async function GET(req: NextRequest) {
  try {
    const token = extractToken(req);
    if (!token) return errorResponse('Auth required', 401);
    const user = await getUserFromToken(token);
    if (!user) return errorResponse('Invalid token', 401);
    const profile = await prisma.sellerProfile.findUnique({ where: { userId: user.id }, include: { user: { select: { name: true, email: true, phone: true } } } });
    if (!profile) return errorResponse('Seller profile not found', 404);
    return successResponse({ profile });
  } catch { return errorResponse('Failed to get profile', 500); }
}

export async function PUT(req: NextRequest) {
  try {
    const token = extractToken(req);
    if (!token) return errorResponse('Auth required', 401);
    const user = await getUserFromToken(token);
    if (!user) return errorResponse('Invalid token', 401);
    const body = await req.json();
    const { storeName, description, profileImage, backgroundImage, socialLinks, bankAccountNumber, bankIfscCode, bankAccountHolderName } = body;
    const profile = await prisma.sellerProfile.update({ where: { userId: user.id }, data: { storeName, description, profileImage, backgroundImage, socialLinks, bankAccountNumber, bankIfscCode, bankAccountHolderName } });
    return successResponse({ profile });
  } catch { return errorResponse('Failed to update profile', 500); }
}
