import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const [categories, breeds, attributes, priceRange] = await Promise.all([
      prisma.category.findMany({
        select: { name: true, slug: true, _count: { select: { pets: true } } }
      }),
      prisma.breed.findMany({
        select: { name: true, _count: { select: { pets: true } } }
      }),
      prisma.petAttribute.groupBy({
        by: ['type', 'value'],
        _count: { _all: true }
      }),
      prisma.pet.aggregate({
        _min: { price: true },
        _max: { price: true }
      })
    ]);

    return NextResponse.json({
      categories,
      breeds,
      attributes,
      priceRange: {
        min: priceRange._min.price,
        max: priceRange._max.price
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch facets' }, { status: 500 });
  }
}
