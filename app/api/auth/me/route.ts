import { NextRequest } from 'next/server';
import { getUserFromToken } from '@/lib/auth';
import { errorResponse, successResponse, extractToken } from '@/lib/middleware';

export async function GET(req: NextRequest) {
  try {
    const token = extractToken(req);
    if (!token) return errorResponse('Auth required', 401);
    const user = await getUserFromToken(token);
    if (!user) return errorResponse('Invalid token', 401);
    if (!user.isActive || user.isBanned) return errorResponse('Account inactive', 403);
    return successResponse({ user: { id: user.id, email: user.email, name: user.name, phone: user.phone, role: user.role, avatar: user.avatar, emailVerified: user.emailVerified, phoneVerified: user.phoneVerified, sellerProfile: user.sellerProfile } });
  } catch { return errorResponse('Failed to get user', 500); }
}
