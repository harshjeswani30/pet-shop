import HeroSection from './components/HeroSection';
import Newsletter from './components/Newsletter';
import { ShieldCheck, Award, Stethoscope, Star, Users, Home as HomeIcon, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { branding } from '@/lib/config/branding';

const features = [
  { name: 'Ethical Breeding', description: 'We only partner with certified breeders who follow strict animal welfare guidelines.', icon: ShieldCheck },
  { name: 'Trusted Brand', description: 'Recognized as India\'s most trusted pet marketplace for quality and health.', icon: Award },
  { name: 'Vet Checked', description: 'Every pet listed undergoes thorough health examination by qualified veterinarians.', icon: Stethoscope },
];

const stats = [
  { icon: HomeIcon, value: branding.stats.happyHomes, label: 'Happy Homes' },
  { icon: Users, value: branding.stats.verifiedSellers, label: 'Verified Sellers' },
  { icon: Star, value: branding.stats.satisfactionRate, label: 'Satisfaction' },
  { icon: TrendingUp, value: branding.stats.petsAdopted, label: 'Pets Adopted' },
];

const categories = [
  { name: 'Dogs & Puppies', slug: 'dogs-and-puppies', image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a' },
  { name: 'Cats & Kittens', slug: 'cats-and-kittens', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba' },
  { name: 'Birds', slug: 'birds', image: 'https://images.unsplash.com/photo-1522850949506-5855141de465' },
  { name: 'Exotic Animals', slug: 'exotic-animals', image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7' },
];

const testimonials = [
  { content: "Found my beautiful Golden Retriever through PetCompanion. The process was smooth and Buddy is very healthy!", author: "Ananya Iyer", role: "Pet Parent", location: "Mumbai", rating: 5, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330" },
  { content: "The best place in India to find exotic pets. Highly recommend their verified sellers and customer service.", author: "Vikram Singh", role: "Exotic Bird Enthusiast", location: "Delhi", rating: 5, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" },
  { content: "Professional service and very caring staff. They helped me choose the right breed for my apartment.", author: "Sneha Kapoor", role: "Cat Lover", location: "Bangalore", rating: 5, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80" },
  { content: "As a seller, this platform has transformed my business. The verification process ensures only quality breeders.", author: "Rajesh Kumar", role: "Verified Seller", location: "Chennai", rating: 5, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" },
  { content: "Adopted a Persian cat last month. The pet came with all health certificates. Highly trustworthy platform!", author: "Priya Sharma", role: "Happy Pet Parent", location: "Hyderabad", rating: 5, image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2" },
];

const certifications = [
  { name: "ISO 9001:2015", description: "Quality Management Certified" },
  { name: "PETA Approved", description: "Ethical Treatment Verified" },
  { name: "Ethical Breeding", description: "Standards Compliant" },
  { name: "Vet Certified", description: "Health Checked Pets" },
];

export default function Home() {
  return (
    <div>
      <HeroSection />

      {/* Stats Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center text-white">
                <stat.icon className="h-10 w-10 mx-auto mb-4 opacity-80" />
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">Why Choose {branding.company.name}?</h2>
          <p className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto">{branding.company.mission}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col items-center p-6 rounded-2xl bg-gray-50 hover:bg-primary-50 transition">
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

      {/* Trust Badges */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">Our Certifications</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {certifications.map((cert) => (
              <div key={cert.name} className="flex items-center space-x-3 bg-white px-6 py-4 rounded-lg shadow-sm">
                <Award className="h-8 w-8 text-accent-500" />
                <div>
                  <div className="font-semibold text-gray-900">{cert.name}</div>
                  <div className="text-sm text-gray-500">{cert.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Shop by Category</h2>
              <p className="mt-4 text-gray-600">Find the perfect companion from our diverse range</p>
            </div>
            <Link href="/shop" className="text-primary-600 font-semibold hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat) => (
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
      <section className="py-24 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">What Our Customers Say</h2>
          <p className="text-center text-gray-600 mb-16">Real stories from our happy pet parents and sellers</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex mb-4 text-yellow-400">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                </div>
                <p className="text-gray-700 italic mb-6">&ldquo;{t.content}&rdquo;</p>
                <div className="flex items-center">
                  <img src={t.image} alt={t.author} className="h-12 w-12 rounded-full object-cover mr-4" />
                  <div>
                    <p className="font-bold text-gray-900">{t.author}</p>
                    <p className="text-sm text-gray-500">{t.role} • {t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Find Your Perfect Companion?</h2>
          <p className="text-xl text-primary-100 mb-10">Join thousands of happy families who found their pets through {branding.company.name}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/shop" className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 transition">Browse Pets</Link>
            <Link href="/auth/register?seller=true" className="inline-flex justify-center items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-md text-white hover:bg-white/10 transition">Become a Seller</Link>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
