import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { Heart, MessageCircle, ShieldCheck, MapPin, Calendar, Award } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const pet = await prisma.pet.findUnique({
    where: { id },
    include: {
      category: true,
      breed: true,
      images: true,
      attributes: true,
      seller: true,
      reviews: true,
    },
  });

  if (!pet) {
    notFound();
  }

  const mainImage = pet.images[0]?.url || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: pet.name,
    image: pet.images.map(img => img.url),
    description: pet.description,
    offers: {
      '@type': 'Offer',
      price: pet.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden border">
              <Image
                src={mainImage}
                alt={pet.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {pet.images.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-lg overflow-hidden border cursor-pointer hover:opacity-80 transition">
                  <Image src={img.url} alt={`${pet.name} ${i}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="mb-8">
              <nav className="flex text-sm text-gray-500 mb-4 space-x-2">
                <span>Shop</span>
                <span>/</span>
                <span>{pet.category.name}</span>
                <span>/</span>
                <span className="text-gray-900">{pet.breed.name}</span>
              </nav>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{pet.name}</h1>
              <p className="text-lg text-gray-600">{pet.breed.name}</p>
            </div>

            <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl mb-8">
              <div>
                <p className="text-sm text-gray-500 mb-1">Price</p>
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-primary-600">₹{pet.price.toLocaleString()}</span>
                  {pet.oldPrice && (
                    <span className="text-lg text-gray-400 line-through">₹{pet.oldPrice.toLocaleString()}</span>
                  )}
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="p-3 bg-white border rounded-full hover:bg-gray-50 transition">
                  <Heart className="h-6 w-6 text-gray-400" />
                </button>
                <button className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white font-bold rounded-full hover:bg-primary-700 transition">
                  <MessageCircle className="h-5 w-5" />
                  <span>Contact Seller</span>
                </button>
              </div>
            </div>

            {/* Attributes Grid */}
            <div className="grid grid-cols-2 gap-4 mb-12">
              {pet.attributes.map((attr) => (
                <div key={attr.id} className="p-4 border rounded-xl">
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">{attr.type}</p>
                  <p className="font-semibold text-gray-900">{attr.value}</p>
                </div>
              ))}
            </div>

            <div className="prose prose-blue max-w-none mb-12">
              <h3 className="text-xl font-bold mb-4">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {pet.description}
              </p>
            </div>

            {/* Seller Info */}
            <div className="p-6 border rounded-2xl">
              <h3 className="text-lg font-bold mb-4">Seller Information</h3>
              <div className="flex items-center space-x-4 mb-6">
                <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <Award className="h-8 w-8 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{pet.seller.name}</h4>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <span className="flex items-center"><Star className="h-4 w-4 text-yellow-400 fill-current mr-1" /> {pet.seller.rating}</span>
                    <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" /> {pet.seller.address}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-6">{pet.seller.description}</p>
              <button className="w-full py-3 border-2 border-primary-600 text-primary-600 font-bold rounded-xl hover:bg-primary-50 transition">
                View Seller Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Star({ className, ...props }: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
