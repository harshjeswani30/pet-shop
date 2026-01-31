import ProductGrid from '@/app/components/ProductGrid';
import FilterSidebar from '@/app/components/FilterSidebar';
import Pagination from '@/app/components/Pagination';
import { prisma } from '@/lib/prisma';
import { Suspense } from 'react';

export default async function AllPetsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const sp = await searchParams;
  const page = parseInt(sp.page || '1');
  const limit = 12;
  const skip = (page - 1) * limit;

  const where: any = {};
  
  if (sp.search) {
    where.OR = [
      { name: { contains: sp.search } },
      { description: { contains: sp.search } },
      { breed: { name: { contains: sp.search } } },
    ];
  }

  if (sp.minPrice || sp.maxPrice) {
    where.price = {
      gte: sp.minPrice ? parseFloat(sp.minPrice) : undefined,
      lte: sp.maxPrice ? parseFloat(sp.maxPrice) : undefined,
    };
  }

  const attributeFilters: any[] = [];
  if (sp.age) attributeFilters.push({ type: 'Age', value: sp.age });
  if (sp.gender) attributeFilters.push({ type: 'Gender', value: sp.gender });
  if (sp.coatType) attributeFilters.push({ type: 'Coat Type', value: sp.coatType });
  if (sp.color) attributeFilters.push({ type: 'Color', value: sp.color });
  if (sp.adoptiveType) attributeFilters.push({ type: 'Adoptive Type', value: sp.adoptiveType });
  if (sp.certificate) attributeFilters.push({ type: 'Certificate', value: sp.certificate });
  
  if (attributeFilters.length > 0) {
    where.AND = attributeFilters.map(attr => ({
      attributes: {
        some: { type: attr.type, value: attr.value }
      }
    }));
  }

  const [pets, total] = await Promise.all([
    prisma.pet.findMany({
      where,
      include: {
        category: true,
        breed: true,
        images: true,
        attributes: true,
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.pet.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            {sp.search ? `Search Results for "${sp.search}"` : 'All Pets'}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Browse through our complete collection of healthy and happy pets.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="w-full lg:w-64 flex-shrink-0">
            <Suspense fallback={<div>Loading filters...</div>}>
              <FilterSidebar />
            </Suspense>
          </aside>

          <main className="flex-grow">
            <div className="mb-8 flex justify-between items-center">
              <p className="text-gray-600">{total} pets found</p>
            </div>

            <ProductGrid pets={pets} />

            <Pagination totalPages={totalPages} currentPage={page} />
          </main>
        </div>
      </div>
    </div>
  );
}
