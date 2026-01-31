import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const category = searchParams.get('category');
  const breed = searchParams.get('breed');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const age = searchParams.get('age');
  const gender = searchParams.get('gender');
  const sort = searchParams.get('sort') || 'newest';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');
  
  const skip = (page - 1) * limit;

  const where: Prisma.PetWhereInput = {};

  if (category) {
    where.category = { slug: category };
  }
  
  if (breed) {
    where.breed = { name: breed };
  }

  if (minPrice || maxPrice) {
    where.price = {
      gte: minPrice ? parseFloat(minPrice) : undefined,
      lte: maxPrice ? parseFloat(maxPrice) : undefined,
    };
  }

  // Filter by attributes
  const attributeFilters: any[] = [];
  if (age) attributeFilters.push({ type: 'Age', value: age });
  if (gender) attributeFilters.push({ type: 'Gender', value: gender });
  if (searchParams.get('coatType')) attributeFilters.push({ type: 'Coat Type', value: searchParams.get('coatType') });
  if (searchParams.get('color')) attributeFilters.push({ type: 'Color', value: searchParams.get('color') });
  if (searchParams.get('adoptiveType')) attributeFilters.push({ type: 'Adoptive Type', value: searchParams.get('adoptiveType') });
  if (searchParams.get('certificate')) attributeFilters.push({ type: 'Certificate', value: searchParams.get('certificate') });
  
  if (attributeFilters.length > 0) {
    where.AND = attributeFilters.map(attr => ({
      attributes: {
        some: { type: attr.type, value: attr.value }
      }
    }));
  }

  let orderBy: Prisma.PetOrderByWithRelationInput = { createdAt: 'desc' };
  if (sort === 'price_low') orderBy = { price: 'asc' };
  if (sort === 'price_high') orderBy = { price: 'desc' };
  if (sort === 'popular') orderBy = { isHighSold: 'desc' };

  try {
    const [pets, total] = await Promise.all([
      prisma.pet.findMany({
        where,
        include: {
          category: true,
          breed: true,
          images: true,
          attributes: true,
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.pet.count({ where }),
    ]);

    return NextResponse.json({
      pets,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch pets' }, { status: 500 });
  }
}
