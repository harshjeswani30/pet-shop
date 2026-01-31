import ProductCard from './ProductCard';

interface ProductGridProps {
  pets: any[];
}

export default function ProductGrid({ pets }: ProductGridProps) {
  if (pets.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No pets found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {pets.map((pet) => (
        <ProductCard key={pet.id} pet={pet} />
      ))}
    </div>
  );
}
