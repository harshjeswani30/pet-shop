import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken, JWTPayload, isAdmin, isSeller } from './auth';
import { UserRole } from '@prisma/client';

export interface AuthenticatedRequest extends NextRequest { user?: JWTPayload; }
export type RouteHandler = (req: AuthenticatedRequest) => Promise<NextResponse> | NextResponse;

export function extractToken(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) return authHeader.substring(7);
  const tokenCookie = req.cookies.get('accessToken');
  if (tokenCookie) return tokenCookie.value;
  return null;
}

export function withAuth(handler: RouteHandler): RouteHandler {
  return async (req: AuthenticatedRequest) => {
    try {
      const token = extractToken(req);
      if (!token) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
      const payload = verifyAccessToken(token);
      req.user = payload;
      return handler(req);
    } catch { return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 }); }
  };
}

export function withRole(allowedRoles: UserRole[]) {
  return (handler: RouteHandler): RouteHandler => {
    return async (req: AuthenticatedRequest) => {
      try {
        const token = extractToken(req);
        if (!token) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
        const payload = verifyAccessToken(token);
        req.user = payload;
        if (!allowedRoles.includes(payload.role)) return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
        return handler(req);
      } catch { return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 }); }
    };
  };
}

export function withAdmin(handler: RouteHandler): RouteHandler {
  return async (req: AuthenticatedRequest) => {
    try {
      const token = extractToken(req);
      if (!token) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
      const payload = verifyAccessToken(token);
      req.user = payload;
      if (!isAdmin(payload.role)) return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
      return handler(req);
    } catch { return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 }); }
  };
}

export function withSeller(handler: RouteHandler): RouteHandler {
  return async (req: AuthenticatedRequest) => {
    try {
      const token = extractToken(req);
      if (!token) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
      const payload = verifyAccessToken(token);
      req.user = payload;
      if (!isSeller(payload.role)) return NextResponse.json({ error: 'Seller access required' }, { status: 403 });
      return handler(req);
    } catch { return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 }); }
  };
}

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
export function rateLimit(maxRequests: number, windowMs: number) {
  return (handler: RouteHandler): RouteHandler => {
    return async (req: AuthenticatedRequest) => {
      const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'; const now = Date.now();
      const record = rateLimitMap.get(ip);
      if (!record || now > record.resetTime) { rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs }); return handler(req); }
      if (record.count >= maxRequests) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
      record.count++; return handler(req);
    };
  };
}

export function errorResponse(message: string, status: number = 400): NextResponse { return NextResponse.json({ error: message }, { status }); }
export function successResponse(data: unknown, status: number = 200): NextResponse { return NextResponse.json({ success: true, data }, { status }); }
