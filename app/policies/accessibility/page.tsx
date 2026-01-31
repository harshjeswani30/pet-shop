export default function AccessibilityPage() {
  return (
    <div className="bg-white min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Accessibility Statement</h1>
        <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
          <p>PetMarket India is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.</p>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Conformance Status</h2>
            <p>The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. PetMarket India is striving to conform to WCAG 2.1 level AA standards.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Accessibility Features</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Semantic HTML for better screen reader support.</li>
              <li>Sufficient color contrast for all text elements.</li>
              <li>Keyboard navigation support for all interactive elements.</li>
              <li>Alt text for all informative images.</li>
              <li>Responsive design that works across various screen sizes and zoom levels.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Feedback</h2>
            <p>We welcome your feedback on the accessibility of PetMarket India. Please let us know if you encounter accessibility barriers on our website:</p>
            <p className="mt-2">Email: accessibility@petmarket.in</p>
          </section>
        </div>
      </div>
    </div>
  );
}
