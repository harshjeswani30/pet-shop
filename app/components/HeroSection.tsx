import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="relative bg-primary-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="relative z-10 lg:max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Find Healthy <span className="text-primary-600">Pets & Companions</span> in India
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg">
            Connect with ethical breeders and find your perfect pet companion. All our pets are vet-checked and vaccinated for your peace of mind.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/shop"
              className="inline-flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:text-lg transition"
            >
              Shop Pets
            </Link>
            <Link
              href="/about"
              className="inline-flex justify-center items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:text-lg transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:block absolute top-0 right-0 w-1/2 h-full">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=2000&auto=format&fit=crop"
          alt="Happy dog with owner"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-50 via-transparent to-transparent"></div>
      </div>
    </div>
  );
}
