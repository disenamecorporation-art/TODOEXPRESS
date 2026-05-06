import { useSearchParams } from "react-router-dom";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import { Search, ShoppingBag } from "lucide-react";

interface SearchPageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export default function SearchPage({ products, onAddToCart, onViewDetails }: SearchPageProps) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 min-h-[60vh]">
      <div className="mb-12 flex items-center gap-4">
        <div className="p-4 bg-blue-50 text-[#003366] rounded-2xl">
          <Search className="h-8 w-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Resultados para: "{query}"</h1>
          <p className="text-gray-500 mt-1">Encontramos {filteredProducts.length} productos que coinciden con tu búsqueda.</p>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm">
          <ShoppingBag className="h-20 w-20 text-gray-200 mx-auto mb-6 opacity-20" />
          <h3 className="text-2xl font-bold text-gray-700 mb-2">No encontramos lo que buscas</h3>
          <p className="text-gray-500 max-w-md mx-auto">Prueba con otros términos o navega por nuestras categorías para encontrar el producto ideal.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
}
