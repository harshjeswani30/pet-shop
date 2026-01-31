import { NextRequest } from 'next/server';
import { revokeRefreshToken, verifyRefreshToken } from '@/lib/auth';
import { successResponse } from '@/lib/middleware';

export async function POST(req: NextRequest) {
  try {
    const { refreshToken } = await req.json();
    if (refreshToken) { try { const payload = verifyRefreshToken(refreshToken); await revokeRefreshToken(payload.userId, refreshToken); } catch {} }
    return successResponse({ message: 'Logged out' });
  } catch { return successResponse({ message: 'Logged out' }); }
}
