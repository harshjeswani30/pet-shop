'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';

interface Favorite {
  id: string;
  pet: {
    id: string;
    name: string;
    price: number;
    oldPrice?: number;
    images: { url: string }[];
    breed: { name: string };
    category: { name: string };
  };
}

export default function MyFavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        router.push('/auth/login');
        return;
      }

      try {
        // In production, fetch from API
        setFavorites([]);
      } catch {
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [router]);

  const removeFavorite = async (id: string) => {
    setFavorites(favorites.filter(f => f.id !== id));
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Favorites</h1>

        {favorites.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No favorites yet</h2>
            <p className="text-gray-600 mb-6">Save pets you love and find them easily later!</p>
            <Link href="/shop" className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700">
              Browse Pets
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) => (
              <div key={favorite.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
                <div className="relative">
                  <img src={favorite.pet.images[0]?.url} alt={favorite.pet.name} className="w-full h-48 object-cover" />
                  <button onClick={() => removeFavorite(favorite.id)} className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md text-red-500 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500">{favorite.pet.category.name}</p>
                  <h3 className="font-semibold text-gray-900">{favorite.pet.name}</h3>
                  <p className="text-sm text-gray-600">{favorite.pet.breed.name}</p>
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <span className="text-lg font-bold text-gray-900">₹{favorite.pet.price.toLocaleString()}</span>
                      {favorite.pet.oldPrice && (
                        <span className="ml-2 text-sm text-gray-400 line-through">₹{favorite.pet.oldPrice.toLocaleString()}</span>
                      )}
                    </div>
                    <Link href={`/products/${favorite.pet.id}`} className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                      <ShoppingBag className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
