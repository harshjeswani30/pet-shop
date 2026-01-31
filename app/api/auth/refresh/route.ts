import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyRefreshToken, generateTokenPair, verifyStoredRefreshToken, revokeRefreshToken, storeRefreshToken } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/middleware';

export async function POST(req: NextRequest) {
  try {
    const { refreshToken } = await req.json();
    if (!refreshToken) return errorResponse('Refresh token required');
    let payload; try { payload = verifyRefreshToken(refreshToken); } catch { return errorResponse('Invalid token', 401); }
    if (!await verifyStoredRefreshToken(payload.userId, refreshToken)) return errorResponse('Token revoked', 401);
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user || !user.isActive || user.isBanned) return errorResponse('User not found', 401);
    await revokeRefreshToken(payload.userId, refreshToken);
    const tokens = generateTokenPair({ userId: user.id, email: user.email, role: user.role });
    await storeRefreshToken(user.id, tokens.refreshToken);
    return successResponse({ tokens });
  } catch { return errorResponse('Refresh failed', 500); }
}
