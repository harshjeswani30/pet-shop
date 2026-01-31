import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    const pets = await prisma.pet.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { description: { contains: query } },
          { breed: { name: { contains: query } } },
          { category: { name: { contains: query } } },
        ],
      },
      include: {
        images: true,
        breed: true,
        category: true,
      },
      take: 20,
    });

    return NextResponse.json(pets);
  } catch (error) {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
