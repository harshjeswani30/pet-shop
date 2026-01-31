import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default async function ShopPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { pets: true },
      },
    },
  });

  const collections = [
    { name: 'New Arrivals', href: '/shop/new-arrivals', color: 'bg-blue-600' },
    { name: 'Best Sellers', href: '/shop/high-sold', color: 'bg-green-600' },
    { name: 'On Sale', href: '/shop/on-sale', color: 'bg-red-600' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">Browse Pet Categories</h1>
          <Link href="/shop/all" className="text-primary-600 font-bold hover:underline">View All Pets</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/categories/${category.slug}`}
              className="group relative h-80 rounded-2xl overflow-hidden shadow-lg"
            >
              <Image 
                src={category.image || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1'} 
                alt={category.name}
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h2 className="text-3xl font-bold text-white mb-2">{category.name}</h2>
                <p className="text-gray-200 mb-4">{category._count.pets} pets available</p>
                <div className="inline-flex items-center space-x-2 text-white font-bold group-hover:translate-x-2 transition">
                  <span>View All</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Smart Collections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {collections.map((col) => (
            <Link 
              key={col.name} 
              href={col.href}
              className={`${col.color} p-8 rounded-2xl text-white hover:opacity-90 transition shadow-md flex flex-col justify-between h-48`}
            >
              <h3 className="text-2xl font-bold">{col.name}</h3>
              <div className="flex justify-end">
                <ArrowRight className="h-8 w-8" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
