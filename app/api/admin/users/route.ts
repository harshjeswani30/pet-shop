import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/auth';
import { errorResponse, successResponse, extractToken } from '@/lib/middleware';
import { Prisma } from '@prisma/client';

export async function GET(req: NextRequest) {
  try {
    const token = extractToken(req);
    if (!token) return errorResponse('Auth required', 401);
    const admin = await getUserFromToken(token);
    if (!admin || (admin.role !== 'ADMIN' && admin.role !== 'SUPER_ADMIN')) return errorResponse('Admin access required', 403);
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const role = searchParams.get('role') as Prisma.EnumUserRoleFilter | undefined;
    const where: Prisma.UserWhereInput = {};
    if (role) where.role = role;
    if (search) where.OR = [{ name: { contains: search } }, { email: { contains: search } }];
    const [users, total] = await Promise.all([
      prisma.user.findMany({ where, skip: (page - 1) * limit, take: limit, orderBy: { createdAt: 'desc' }, select: { id: true, email: true, name: true, role: true, isActive: true, isBanned: true, emailVerified: true, createdAt: true, sellerProfile: { select: { storeName: true, verificationStatus: true } } } }),
      prisma.user.count({ where })
    ]);
    return successResponse({ users, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch { return errorResponse('Failed to get users', 500); }
}

export async function PATCH(req: NextRequest) {
  try {
    const token = extractToken(req);
    if (!token) return errorResponse('Auth required', 401);
    const admin = await getUserFromToken(token);
    if (!admin || (admin.role !== 'ADMIN' && admin.role !== 'SUPER_ADMIN')) return errorResponse('Admin access required', 403);
    const { userId, isActive, isBanned, role } = await req.json();
    if (!userId) return errorResponse('User ID required');
    const user = await prisma.user.update({ where: { id: userId }, data: { isActive, isBanned, role } });
    return successResponse({ user });
  } catch { return errorResponse('Failed to update user', 500); }
}
