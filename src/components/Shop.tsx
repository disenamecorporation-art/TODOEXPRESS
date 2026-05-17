import React from "react";
import { Product } from "@/types";
import CategorySidebar from "./CategorySidebar";
import ProductCard from "./ProductCard";
import CategoryBar from "./CategoryBar";
import { LayoutGrid } from "lucide-react";

interface ShopProps {
  products: Product[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export default function Shop({ 
  products, 
  activeCategory, 
  onSelectCategory, 
  onAddToCart, 
  onViewDetails 
}: ShopProps) {
  const filteredProducts = activeCategory === "Todos" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="bg-gray-50/30 min-h-screen">
      {/* Mobile Category Bar */}
      <div className="lg:hidden sticky top-16 z-30 bg-white border-b border-gray-100 shadow-sm">
        <CategoryBar activeCategory={activeCategory} onSelectCategory={onSelectCategory} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex gap-8">
        {/* Desktop Sidebar */}
        <CategorySidebar activeCategory={activeCategory} onSelectCategory={onSelectCategory} />

        {/* Product Grid Area */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-gray-900">{activeCategory}</h2>
              <p className="text-gray-500 mt-1">Mostrando {filteredProducts.length} productos</p>
            </div>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={onAddToCart} 
                  onViewDetails={onViewDetails} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <LayoutGrid className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No hay productos en esta categoría</h3>
              <p className="text-gray-500 mb-6">Estamos trabajando para traer nuevos productos pronto.</p>
              <button 
                onClick={() => onSelectCategory("Todos")}
                className="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-primary/90 transition-all"
              >
                Ver todas las categorías
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
