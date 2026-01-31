import Link from 'next/link';
import Image from 'next/image';

const posts = [
  {
    slug: 'choosing-the-right-breed',
    title: 'Choosing the Right Breed for Your Apartment',
    excerpt: 'Living in an apartment shouldn\'t stop you from having a pet. Here are the best breeds for compact living.',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=1000&auto=format&fit=crop',
    date: 'Jan 28, 2024',
  },
  {
    slug: 'puppy-vaccination-guide',
    title: 'A Complete Guide to Puppy Vaccinations in India',
    excerpt: 'Keep your puppy healthy with our comprehensive vaccination schedule and guide.',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop',
    date: 'Jan 25, 2024',
  },
  {
    slug: 'essential-cat-care-tips',
    title: 'Essential Tips for First-Time Cat Owners',
    excerpt: 'Everything you need to know about bringing your first feline friend home.',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop',
    date: 'Jan 20, 2024',
  },
];

export default function BlogPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-12">Pet Care Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="relative h-64">
                <Image src={post.image} alt={post.title} fill className="object-cover" />
              </div>
              <div className="p-8">
                <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                <h2 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition">{post.title}</h2>
                <p className="text-gray-600">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
