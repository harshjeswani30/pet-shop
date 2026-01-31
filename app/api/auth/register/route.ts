import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, generateTokenPair, storeRefreshToken, generateEmailVerificationToken } from '@/lib/auth';
import { sendWelcomeEmail, sendVerificationEmail } from '@/lib/emailService';
import { errorResponse, successResponse } from '@/lib/middleware';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, name, phone, role = 'CUSTOMER', storeName, storeSlug } = body;
    if (!email || !password || !name) return errorResponse('Email, password, and name are required');
    if (password.length < 8) return errorResponse('Password must be at least 8 characters');
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return errorResponse('Email already registered');
    const hashed = await hashPassword(password);
    const user = await prisma.user.create({ data: { email, password: hashed, name, phone, role } });
    if (role === 'SELLER') {
      if (!storeName || !storeSlug) return errorResponse('Store name and slug required for sellers');
      const existingSlug = await prisma.sellerProfile.findUnique({ where: { storeSlug } });
      if (existingSlug) return errorResponse('Store slug already taken');
      await prisma.sellerProfile.create({ data: { userId: user.id, storeName, storeSlug, verificationStatus: 'NOT_STARTED' } });
    }
    const tokens = generateTokenPair({ userId: user.id, email: user.email, role: user.role });
    await storeRefreshToken(user.id, tokens.refreshToken);
    const verificationToken = await generateEmailVerificationToken(user.id);
    await Promise.all([sendVerificationEmail(email, name, verificationToken), sendWelcomeEmail(email, name)]);
    return successResponse({ user: { id: user.id, email, name, role, emailVerified: false }, tokens, message: 'Registration successful. Check email for verification.' }, 201);
  } catch (error) { console.error('Registration error:', error); return errorResponse('Registration failed', 500); }
}
