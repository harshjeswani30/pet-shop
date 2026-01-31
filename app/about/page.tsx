import { branding } from '@/lib/config/branding';
import { Heart, Shield, Award, Users, Target, Sparkles } from 'lucide-react';

const values = [
  { icon: Shield, title: 'Trust', description: 'We verify every seller and health-check every pet to ensure complete transparency.' },
  { icon: Award, title: 'Quality', description: 'Only the healthiest pets from certified ethical breeders make it to our platform.' },
  { icon: Heart, title: 'Animal Welfare', description: 'We prioritize the wellbeing of animals above all else in every transaction.' },
  { icon: Target, title: 'Transparency', description: 'Clear pricing, verified documentation, and honest communication always.' },
];

const team = [
  { name: 'Arjun Mehta', role: 'CEO & Founder', bio: 'Passionate about connecting pets with loving families. Former tech executive with a vision for ethical pet trade.', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a' },
  { name: 'Priya Sharma', role: 'Co-Founder & COO', bio: 'Veterinary professional turned entrepreneur. Ensures all health standards are met across the platform.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2' },
  { name: 'Dr. Rajesh Kumar', role: 'Chief Veterinary Officer', bio: '25+ years in animal healthcare. Leads our vet verification and health certification programs.', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d' },
  { name: 'Sneha Patel', role: 'Head of Operations', bio: 'Operations expert ensuring smooth experiences for both buyers and sellers nationwide.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956' },
];

const milestones = [
  { year: '2023', title: 'Platform Launch', description: 'Started with a mission to revolutionize pet adoption in India.' },
  { year: '2023', title: '500+ Verified Sellers', description: 'Built a network of trusted, certified breeders across the country.' },
  { year: '2024', title: '10,000+ Happy Homes', description: 'Helped thousands of families find their perfect companions.' },
  { year: '2024', title: 'ISO Certification', description: 'Achieved ISO 9001:2015 certification for quality management.' },
];

export const metadata = {
  title: `About Us - ${branding.company.name}`,
  description: `Learn about ${branding.company.name}'s mission to connect ethical breeders with loving homes.`,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Our Story</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Founded in {branding.company.foundingYear}, {branding.company.name} began with a simple mission: 
            to create a trusted marketplace where ethical breeders connect with loving families.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                {branding.company.mission}
              </p>
              <p className="text-gray-600 mb-8">
                In a market plagued by unverified sellers and unhealthy pets, we set out to create a platform 
                that prioritizes animal welfare, transparency, and trust. Every pet listed on our platform 
                undergoes rigorous health checks, and every seller is thoroughly vetted.
              </p>
              <div className="flex flex-wrap gap-4">
                {branding.company.values.map((value) => (
                  <span key={value} className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 text-primary-700 font-medium text-sm">
                    <Sparkles className="h-4 w-4 mr-2" />
                    {value}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1450778869180-41d0601e046e" 
                alt="Happy pet with family" 
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-accent-500 text-white rounded-2xl p-6 shadow-xl">
                <p className="text-3xl font-bold">{branding.stats.happyHomes}</p>
                <p className="text-accent-100">Happy Families</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Our Core Values</h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">The principles that guide everything we do</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition">
                <div className="h-14 w-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                  <value.icon className="h-7 w-7 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-1/2 pr-8 text-right">
                    {index % 2 === 0 && (
                      <div className="bg-primary-50 p-6 rounded-2xl inline-block text-left">
                        <span className="text-accent-600 font-bold">{milestone.year}</span>
                        <h3 className="text-xl font-bold text-gray-900 mt-1">{milestone.title}</h3>
                        <p className="text-gray-600 mt-2">{milestone.description}</p>
                      </div>
                    )}
                  </div>
                  <div className="relative z-10">
                    <div className="h-4 w-4 bg-primary-600 rounded-full border-4 border-white shadow"></div>
                  </div>
                  <div className="w-1/2 pl-8">
                    {index % 2 === 1 && (
                      <div className="bg-primary-50 p-6 rounded-2xl inline-block">
                        <span className="text-accent-600 font-bold">{milestone.year}</span>
                        <h3 className="text-xl font-bold text-gray-900 mt-1">{milestone.title}</h3>
                        <p className="text-gray-600 mt-2">{milestone.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">The passionate people behind {branding.company.name}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition">
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join Our Community</h2>
          <p className="text-xl text-primary-100 mb-10">
            Whether you&apos;re looking for a new family member or want to list your pets, 
            we&apos;d love to have you as part of our community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/shop" className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-primary-600 bg-white hover:bg-gray-50 transition">
              Find a Pet
            </a>
            <a href="/auth/register?seller=true" className="inline-flex justify-center items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-xl text-white hover:bg-white/10 transition">
              Become a Seller
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
