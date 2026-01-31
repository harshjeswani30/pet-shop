import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  const type = (await params).type;
  
  let where = {};
  if (type === 'new-arrivals') {
    where = { isNewArrival: true };
  } else if (type === 'high-sold') {
    where = { isHighSold: true };
  } else if (type === 'on-sale') {
    where = { oldPrice: { not: null } };
  }

  try {
    const pets = await prisma.pet.findMany({
      where,
      include: {
        category: true,
        breed: true,
        images: true,
        attributes: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    return NextResponse.json(pets);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch collection' }, { status: 500 });
  }
}
