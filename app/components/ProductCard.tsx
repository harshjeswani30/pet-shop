import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  pet: any;
}

export default function ProductCard({ pet }: ProductCardProps) {
  const imageUrl = pet.images?.[0]?.url || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1';
  
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100">
      <Link href={`/products/${pet.id}`} className="block relative aspect-square overflow-hidden">
        <Image
          src={imageUrl}
          alt={pet.name}
          fill
          className="object-cover group-hover:scale-105 transition duration-300"
        />
        {pet.oldPrice && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            SALE
          </div>
        )}
        <button className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition">
          <Heart className="h-5 w-5" />
        </button>
      </Link>
      
      <div className="p-4">
        <div className="text-xs text-primary-600 font-semibold mb-1 uppercase tracking-wider">
          {pet.breed?.name}
        </div>
        <Link href={`/products/${pet.id}`}>
          <h3 className="font-bold text-gray-900 mb-1 truncate group-hover:text-primary-600 transition">
            {pet.name}
          </h3>
        </Link>
        <div className="text-sm text-gray-500 mb-3">
          {pet.attributes?.find((a: any) => a.type === 'Age')?.value} • {pet.attributes?.find((a: any) => a.type === 'Gender')?.value}
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="font-bold text-lg text-gray-900">₹{pet.price.toLocaleString()}</span>
            {pet.oldPrice && (
              <span className="text-xs text-gray-400 line-through">₹{pet.oldPrice.toLocaleString()}</span>
            )}
          </div>
          <div className="flex space-x-2">
             <Link 
              href={`/products/${pet.id}`}
              className="px-3 py-1.5 bg-primary-600 text-white text-[10px] font-bold rounded hover:bg-primary-700 transition uppercase"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
