import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = (await params).id;

  try {
    const pet = await prisma.pet.findUnique({
      where: { id },
      include: {
        category: true,
        breed: true,
        images: true,
        attributes: true,
        seller: true,
        reviews: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!pet) {
      return NextResponse.json({ error: 'Pet not found' }, { status: 404 });
    }

    return NextResponse.json(pet);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch pet' }, { status: 500 });
  }
}
