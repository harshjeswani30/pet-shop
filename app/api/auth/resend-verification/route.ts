import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateEmailVerificationToken } from '@/lib/auth';
import { sendVerificationEmail } from '@/lib/emailService';
import { errorResponse, successResponse } from '@/lib/middleware';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return errorResponse('Email is required');
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return errorResponse('User not found', 404);
    }

    if (user.emailVerified) {
      return errorResponse('Email is already verified', 400);
    }

    // Generate new verification token
    const token = await generateEmailVerificationToken(user.id);
    await sendVerificationEmail(user.email, user.name, token);

    return successResponse({ message: 'Verification email sent' });
  } catch (error) {
    console.error('Resend verification error:', error);
    return errorResponse('Failed to send verification email', 500);
  }
}
