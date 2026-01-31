'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, MapPin, Save, Camera } from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  addresses: {
    id: string;
    label: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    isDefault: boolean;
  }[];
}

export default function MyProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        router.push('/auth/login');
        return;
      }

      try {
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setProfile(data.data.user);
        }
      } catch {
        // Mock data
        setProfile({
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+91 98765 43210',
          addresses: [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleSave = async () => {
    setSaving(true);
    // Save profile logic here
    setTimeout(() => setSaving(false), 1000);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-8">
            <div className="flex items-center">
              <div className="relative">
                <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center text-2xl">
                  {profile?.avatar ? (
                    <img src={profile.avatar} alt={profile.name} className="h-full w-full rounded-full object-cover" />
                  ) : (
                    <span className="text-primary-600 font-bold">{profile?.name?.[0]}</span>
                  )}
                </div>
                <button className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-md text-gray-600 hover:text-primary-600">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div className="ml-6 text-white">
                <h2 className="text-2xl font-bold">{profile?.name}</h2>
                <p className="text-primary-100">{profile?.email}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={profile?.name || ''}
                    onChange={(e) => setProfile(prev => prev ? { ...prev, name: e.target.value } : null)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={profile?.email || ''}
                    disabled
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={profile?.phone || ''}
                    onChange={(e) => setProfile(prev => prev ? { ...prev, phone: e.target.value } : null)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            </div>

            {/* Addresses */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Saved Addresses</h3>
                <button className="text-primary-600 font-medium hover:text-primary-700">+ Add Address</button>
              </div>
              
              {profile?.addresses?.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No addresses saved yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {profile?.addresses?.map((address) => (
                    <div key={address.id} className={`p-4 border rounded-lg ${address.isDefault ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded mb-2">{address.label}</span>
                          <p className="text-gray-900">{address.street}</p>
                          <p className="text-gray-600">{address.city}, {address.state} {address.zipCode}</p>
                        </div>
                        {address.isDefault && <span className="text-sm text-primary-600 font-medium">Default</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50"
              >
                <Save className="h-5 w-5 mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
