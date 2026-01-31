import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPasswordResetToken, revokePasswordResetToken, hashPassword } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/middleware';

export async function POST(req: NextRequest) {
  try {
    const { userId, token, newPassword } = await req.json();
    if (!userId || !token || !newPassword) return errorResponse('All fields required');
    if (newPassword.length < 8) return errorResponse('Password must be 8+ chars');
    if (!await verifyPasswordResetToken(userId, token)) return errorResponse('Invalid or expired token', 400);
    await prisma.user.update({ where: { id: userId }, data: { password: await hashPassword(newPassword) } });
    await revokePasswordResetToken(userId, token);
    return successResponse({ message: 'Password reset successful' });
  } catch { return errorResponse('Reset failed', 500); }
}
