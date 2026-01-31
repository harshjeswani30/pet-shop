import HeroSection from './components/HeroSection';
import Newsletter from './components/Newsletter';
import { ShieldCheck, Award, Stethoscope, Star } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    name: 'Ethical Breeding',
    description: 'We only partner with certified breeders who follow strict animal welfare guidelines.',
    icon: ShieldCheck,
  },
  {
    name: 'Trusted Brand',
    description: 'Recognized as India\'s most trusted pet marketplace for quality and health.',
    icon: Award,
  },
  {
    name: 'Vet Checked',
    description: 'Every pet listed undergoes a thorough health examination by qualified veterinarians.',
    icon: Stethoscope,
  },
];

const categories = [
  { name: 'Dogs & Puppies', slug: 'dogs-and-puppies', image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a' },
  { name: 'Cats & Kittens', slug: 'cats-and-kittens', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba' },
  { name: 'Birds', slug: 'birds', image: 'https://images.unsplash.com/photo-1522850949506-5855141de465' },
  { name: 'Exotic Animals', slug: 'exotic-animals', image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7' },
];

const testimonials = [
  {
    content: "Found my beautiful Golden Retriever through PetMarket. The process was smooth and Buddy is very healthy!",
    author: "Ananya Iyer",
    role: "Pet Parent",
    rating: 5,
  },
  {
    content: "The best place in India to find exotic pets. Highly recommend their verified sellers.",
    author: "Vikram Singh",
    role: "Exotic Bird Enthusiast",
    rating: 5,
  },
  {
    content: "Professional service and very caring staff. They helped me choose the right breed for my apartment.",
    author: "Sneha Kapoor",
    role: "Cat Lover",
    rating: 4,
  },
];

export default function Home() {
  return (
    <div>
      <HeroSection />

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-16">
            Why Choose PetMarket India?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-6">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.name}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Shortcut */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Shop by Category</h2>
              <p className="mt-4 text-gray-600">Find the perfect companion from our diverse range</p>
            </div>
            <Link href="/shop" className="text-primary-600 font-semibold hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, i) => (
              <Link key={cat.slug} href={`/categories/${cat.slug}`} className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition h-80">
                <div className="relative h-2/3 w-full bg-gray-200">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="p-6 h-1/3 flex items-center">
                  <h3 className="font-bold text-lg group-hover:text-primary-600 transition">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-16">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex mb-4 text-yellow-400">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                </div>
                <p className="text-gray-700 italic mb-6">"{t.content}"</p>
                <div>
                  <p className="font-bold text-gray-900">{t.author}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
