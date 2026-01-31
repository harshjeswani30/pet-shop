import ProductGrid from './ProductGrid';
import { prisma } from '@/lib/prisma';

interface CollectionPageProps {
  title: string;
  description: string;
  type: 'new-arrivals' | 'high-sold' | 'on-sale';
}

export default async function CollectionPage({ title, description, type }: CollectionPageProps) {
  let where: any = {};
  if (type === 'new-arrivals') {
    where = { isNewArrival: true };
  } else if (type === 'high-sold') {
    where = { isHighSold: true };
  } else if (type === 'on-sale') {
    where = { oldPrice: { not: null } };
  }

  const pets = await prisma.pet.findMany({
    where,
    include: {
      category: true,
      breed: true,
      images: true,
      attributes: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{title}</h1>
          <p className="text-lg text-gray-600">{description}</p>
        </div>
        <ProductGrid pets={pets} />
      </div>
    </div>
  );
}
