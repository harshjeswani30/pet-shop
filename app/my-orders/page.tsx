'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Package, ChevronRight, Clock, CheckCircle, Truck } from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: string;
  pet: {
    name: string;
    images: { url: string }[];
    breed: { name: string };
  };
  seller: {
    storeName: string;
  };
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        router.push('/auth/login');
        return;
      }

      try {
        const res = await fetch('/api/payments/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setOrders(data.data || []);
        }
      } catch {
        // Mock data for demo
        setOrders([
          {
            id: '1',
            orderNumber: 'ORD-ABC123',
            status: 'PAID',
            total: 25000,
            createdAt: new Date().toISOString(),
            pet: { name: 'Buddy', images: [{ url: 'https://images.unsplash.com/photo-1552053831-71594a27632d' }], breed: { name: 'Golden Retriever' } },
            seller: { storeName: 'Pet Paradise India' },
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'DELIVERED': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'SHIPPED': return <Truck className="h-5 w-5 text-blue-500" />;
      case 'PAID': return <CheckCircle className="h-5 w-5 text-accent-500" />;
      default: return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED': return 'bg-green-100 text-green-700';
      case 'SHIPPED': return 'bg-blue-100 text-blue-700';
      case 'PAID': return 'bg-accent-100 text-accent-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">Start exploring and find your perfect companion!</p>
            <Link href="/shop" className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700">
              Browse Pets
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Order #{order.orderNumber}</p>
                      <p className="text-sm text-gray-400">{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-2">{order.status}</span>
                    </span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <img src={order.pet.images[0]?.url} alt={order.pet.name} className="h-20 w-20 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{order.pet.name}</h3>
                      <p className="text-sm text-gray-600">{order.pet.breed.name}</p>
                      <p className="text-sm text-gray-500">Sold by: {order.seller.storeName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">₹{order.total.toLocaleString()}</p>
                      <Link href={`/my-orders/${order.id}`} className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700 mt-2">
                        View Details <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
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
