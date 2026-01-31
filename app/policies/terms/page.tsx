export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Terms & Conditions</h1>
        <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
          <p>Last Updated: January 2024</p>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using PetMarket India, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Marketplace Platform</h2>
            <p>PetMarket India is a platform that connects buyers with sellers of pets. We do not own, sell, or take responsibility for the pets listed on our platform. The contract for sale is directly between the buyer and the seller.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Ethical Standards</h2>
            <p>All sellers must adhere to our Ethical Breeding Policy. We strictly prohibit the sale of illegal species, mill-bred animals, or any form of animal cruelty. We reserve the right to remove any listing that violates these standards.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Responsibilities</h2>
            <p>Users are responsible for verifying the health and background of pets before purchase. We recommend meeting in person and checking all medical records and certifications.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Limitation of Liability</h2>
            <p>PetMarket India shall not be liable for any disputes, health issues, or financial losses resulting from transactions between buyers and sellers on our platform.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
