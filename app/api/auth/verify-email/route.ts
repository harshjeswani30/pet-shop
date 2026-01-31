import { NextRequest } from 'next/server';
import { verifyEmailToken } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/middleware';

export async function POST(req: NextRequest) {
  try {
    const { userId, token } = await req.json();
    if (!userId || !token) return errorResponse('User ID and token required');
    if (!await verifyEmailToken(userId, token)) return errorResponse('Invalid or expired token', 400);
    return successResponse({ message: 'Email verified' });
  } catch { return errorResponse('Verification failed', 500); }
}
