export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  return (
    <div className="bg-white min-h-screen py-24">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 capitalize">{slug.replace(/-/g, ' ')}</h1>
        <div className="prose prose-blue lg:prose-xl">
          <p>
            This is a sample blog post content for {slug}. In a real application, this would be fetched from a CMS or database.
          </p>
          <p>
            Pet care is an essential part of being a responsible owner. At PetMarket India, we strive to provide you with the best information to keep your pets happy and healthy.
          </p>
          <h2>Key Takeaways</h2>
          <ul>
            <li>Always consult with a veterinarian.</li>
            <li>Maintain a regular feeding and exercise schedule.</li>
            <li>Ensure your pet is up to date on vaccinations.</li>
            <li>Provide plenty of love and attention!</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
