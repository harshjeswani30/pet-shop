import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromToken, hashPassword, verifyPassword } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/middleware';

export async function PUT(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

    if (!token) {
      return errorResponse('Authentication required', 401);
    }

    const user = await getUserFromToken(token);

    if (!user) {
      return errorResponse('Invalid or expired token', 401);
    }

    const body = await req.json();
    const { name, phone, avatar } = body;

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: name || undefined,
        phone: phone || undefined,
        avatar: avatar || undefined,
      },
    });

    return successResponse({
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        phone: updatedUser.phone,
        avatar: updatedUser.avatar,
      },
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return errorResponse('Failed to update profile', 500);
  }
}

// Change password
export async function PATCH(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

    if (!token) {
      return errorResponse('Authentication required', 401);
    }

    const user = await getUserFromToken(token);

    if (!user) {
      return errorResponse('Invalid or expired token', 401);
    }

    const body = await req.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return errorResponse('Current password and new password are required');
    }

    if (newPassword.length < 8) {
      return errorResponse('New password must be at least 8 characters long');
    }

    // Verify current password
    const isValid = await verifyPassword(currentPassword, user.password);

    if (!isValid) {
      return errorResponse('Current password is incorrect', 400);
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return successResponse({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Password change error:', error);
    return errorResponse('Failed to change password', 500);
  }
}
