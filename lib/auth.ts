import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from './prisma';
import { UserRole, TokenType } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret';

export interface JWTPayload { userId: string; email: string; role: UserRole; iat?: number; exp?: number; }
export interface TokenPair { accessToken: string; refreshToken: string; }

export async function hashPassword(password: string): Promise<string> { return bcrypt.hash(password, 10); }
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> { return bcrypt.compare(password, hashedPassword); }
export function generateAccessToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string { return jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' }); }
export function generateRefreshToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string { return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' }); }
export function generateTokenPair(payload: Omit<JWTPayload, 'iat' | 'exp'>): TokenPair { return { accessToken: generateAccessToken(payload), refreshToken: generateRefreshToken(payload) }; }
export function verifyAccessToken(token: string): JWTPayload { return jwt.verify(token, JWT_SECRET) as JWTPayload; }
export function verifyRefreshToken(token: string): JWTPayload { return jwt.verify(token, JWT_REFRESH_SECRET) as JWTPayload; }

export async function storeRefreshToken(userId: string, token: string): Promise<void> {
  const expiresAt = new Date(); expiresAt.setDate(expiresAt.getDate() + 7);
  await prisma.authToken.create({ data: { userId, token: await bcrypt.hash(token, 10), type: TokenType.REFRESH, expiresAt } });
}

export async function verifyStoredRefreshToken(userId: string, token: string): Promise<boolean> {
  const storedTokens = await prisma.authToken.findMany({ where: { userId, type: TokenType.REFRESH, isRevoked: false, expiresAt: { gt: new Date() } } });
  for (const storedToken of storedTokens) { if (await bcrypt.compare(token, storedToken.token)) return true; }
  return false;
}

export async function revokeRefreshToken(userId: string, token: string): Promise<void> {
  const storedTokens = await prisma.authToken.findMany({ where: { userId, type: TokenType.REFRESH, isRevoked: false } });
  for (const storedToken of storedTokens) { if (await bcrypt.compare(token, storedToken.token)) { await prisma.authToken.update({ where: { id: storedToken.id }, data: { isRevoked: true } }); return; } }
}

export async function revokeAllUserTokens(userId: string): Promise<void> {
  await prisma.authToken.updateMany({ where: { userId, isRevoked: false }, data: { isRevoked: true } });
}

export async function generateEmailVerificationToken(userId: string): Promise<string> {
  const token = crypto.randomUUID(); const expiresAt = new Date(); expiresAt.setHours(expiresAt.getHours() + 24);
  await prisma.authToken.create({ data: { userId, token: await bcrypt.hash(token, 10), type: TokenType.EMAIL_VERIFICATION, expiresAt } });
  return token;
}

export async function generatePasswordResetToken(userId: string): Promise<string> {
  const token = crypto.randomUUID(); const expiresAt = new Date(); expiresAt.setHours(expiresAt.getHours() + 1);
  await prisma.authToken.create({ data: { userId, token: await bcrypt.hash(token, 10), type: TokenType.PASSWORD_RESET, expiresAt } });
  return token;
}

export async function verifyEmailToken(userId: string, token: string): Promise<boolean> {
  const storedToken = await prisma.authToken.findFirst({ where: { userId, type: TokenType.EMAIL_VERIFICATION, isRevoked: false, expiresAt: { gt: new Date() } } });
  if (!storedToken) return false;
  const isValid = await bcrypt.compare(token, storedToken.token);
  if (isValid) { await prisma.authToken.update({ where: { id: storedToken.id }, data: { isRevoked: true } }); await prisma.user.update({ where: { id: userId }, data: { emailVerified: true } }); }
  return isValid;
}

export async function verifyPasswordResetToken(userId: string, token: string): Promise<boolean> {
  const storedToken = await prisma.authToken.findFirst({ where: { userId, type: TokenType.PASSWORD_RESET, isRevoked: false, expiresAt: { gt: new Date() } } });
  if (!storedToken) return false;
  return bcrypt.compare(token, storedToken.token);
}

export async function revokePasswordResetToken(userId: string, token: string): Promise<void> {
  const storedTokens = await prisma.authToken.findMany({ where: { userId, type: TokenType.PASSWORD_RESET, isRevoked: false } });
  for (const storedToken of storedTokens) { if (await bcrypt.compare(token, storedToken.token)) { await prisma.authToken.update({ where: { id: storedToken.id }, data: { isRevoked: true } }); return; } }
}

export function isAdmin(role: UserRole): boolean { return role === UserRole.ADMIN || role === UserRole.SUPER_ADMIN; }
export function isSuperAdmin(role: UserRole): boolean { return role === UserRole.SUPER_ADMIN; }
export function isSeller(role: UserRole): boolean { return role === UserRole.SELLER || isAdmin(role); }

export async function getUserFromToken(token: string) {
  try { const payload = verifyAccessToken(token); return await prisma.user.findUnique({ where: { id: payload.userId }, include: { sellerProfile: true } }); } catch { return null; }
}
