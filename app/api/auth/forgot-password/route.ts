import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generatePasswordResetToken } from '@/lib/auth';
import { sendPasswordResetEmail } from '@/lib/emailService';
import { successResponse } from '@/lib/middleware';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return successResponse({ message: 'If account exists, email sent' });
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) { const token = await generatePasswordResetToken(user.id); await sendPasswordResetEmail(user.email, user.name, token); }
    return successResponse({ message: 'If account exists, email sent' });
  } catch { return successResponse({ message: 'If account exists, email sent' }); }
}
