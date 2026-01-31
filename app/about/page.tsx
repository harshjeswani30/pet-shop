import { ShieldCheck, Heart, Award, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="relative py-24 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Our Mission & Values</h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            At PetMarket India, we believe every pet deserves a loving home and every family deserves a healthy, happy companion.
          </p>
        </div>
      </div>

      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Ethical Breeding & Pet Well-being</h2>
              <p className="text-lg text-gray-600 mb-6">
                We are committed to ending unethical breeding practices in India. Every breeder on our platform is thoroughly vetted, and we require proof of health checks and vaccinations for all listings.
              </p>
              <p className="text-lg text-gray-600">
                Our team of experts work closely with veterinarians and animal welfare organizations to ensure that we maintain the highest standards of care and ethical commerce.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="p-8 bg-gray-50 rounded-2xl text-center">
                <ShieldCheck className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="font-bold">Verified Breeders</h3>
              </div>
              <div className="p-8 bg-gray-50 rounded-2xl text-center">
                <Heart className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="font-bold">Health First</h3>
              </div>
              <div className="p-8 bg-gray-50 rounded-2xl text-center">
                <Award className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="font-bold">ISO Certified</h3>
              </div>
              <div className="p-8 bg-gray-50 rounded-2xl text-center">
                <Users className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="font-bold">Community</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
