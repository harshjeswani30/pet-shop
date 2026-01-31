import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = (await params).id;

  try {
    const seller = await prisma.seller.findUnique({
      where: { id },
      include: {
        pets: {
          include: {
            images: true,
            breed: true,
            category: true,
          },
        },
      },
    });

    if (!seller) {
      return NextResponse.json({ error: 'Seller not found' }, { status: 404 });
    }

    return NextResponse.json(seller);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch seller' }, { status: 500 });
  }
}
