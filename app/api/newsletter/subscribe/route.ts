import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const subscription = await prisma.newsletter.upsert({
      where: { email },
      update: {},
      create: { email },
    });

    return NextResponse.json(subscription);
  } catch (error) {
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
  }
}
