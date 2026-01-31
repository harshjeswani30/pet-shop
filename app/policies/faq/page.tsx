export default function FAQPage() {
  const faqs = [
    { q: "How do you verify breeders?", a: "We require breeders to provide official certifications (KCI, INKC) and proof of ethical practices." },
    { q: "Are pets vaccinated?", a: "Yes, all pets listed must have up-to-date vaccination records verified by a licensed vet." },
    { q: "Can I see the pet before buying?", a: "Yes, we encourage visiting the seller's location to meet the pet in person." },
    { q: "Do you offer home delivery?", a: "Delivery options depend on the seller. Some offer specialized pet transport services." },
    { q: "What is KCI certification?", a: "KCI stands for Kennel Club of India, the primary authority for purebred dog registration in India." },
    { q: "What should I do if the pet falls ill shortly after purchase?", a: "Contact the seller immediately and refer to our health guarantee policy." },
    { q: "How can I contact a seller?", a: "Click the 'Contact Seller' button on the pet's detail page." },
    { q: "Are there any adoption options?", a: "Yes, we have a section for pets looking for adoptive homes." },
    { q: "What payment methods are accepted?", a: "Payments are usually handled directly between the buyer and seller." },
    { q: "How long does the process take?", a: "It varies, but typically takes 3-7 days from initial contact to bringing your pet home." },
    { q: "Do you sell exotic pets?", a: "Yes, we have a section for legal exotic small animals." },
    { q: "What is your return policy?", a: "Each seller has their own policy, but we mediate in case of health issues within 48 hours." },
    { q: "How can I list my pet for sale?", a: "You need to register as a verified seller on our platform." },
    { q: "Is there a registration fee?", a: "Listing basic ads is free, but we offer premium placement for a fee." },
    { q: "Are birds hand-fed?", a: "Yes, we have a specific category for hand-fed chicks which are more tamed." },
  ];

  return (
    <div className="bg-white min-h-screen py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-12">Frequently Asked Questions</h1>
        <div className="space-y-8">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b pb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.q}</h3>
              <p className="text-gray-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
