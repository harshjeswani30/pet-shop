import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, generateTokenPair, storeRefreshToken } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/middleware';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) return errorResponse('Email and password required');
    const user = await prisma.user.findUnique({ where: { email }, include: { sellerProfile: true } });
    if (!user) return errorResponse('Invalid credentials', 401);
    if (!user.isActive) return errorResponse('Account deactivated', 403);
    if (user.isBanned) return errorResponse('Account suspended', 403);
    if (!await verifyPassword(password, user.password)) return errorResponse('Invalid credentials', 401);
    const tokens = generateTokenPair({ userId: user.id, email: user.email, role: user.role });
    await storeRefreshToken(user.id, tokens.refreshToken);
    return successResponse({ user: { id: user.id, email: user.email, name: user.name, role: user.role, emailVerified: user.emailVerified, phoneVerified: user.phoneVerified, sellerProfile: user.sellerProfile }, tokens });
  } catch (error) { console.error('Login error:', error); return errorResponse('Login failed', 500); }
}
