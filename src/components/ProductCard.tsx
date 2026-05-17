import React from "react";
import { Plus, ShoppingCart, Info } from "lucide-react";
import { motion } from "motion/react";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-xl group"
    >
      {/* Product Image */}
      <div 
        className="relative aspect-square overflow-hidden bg-gray-50 cursor-pointer p-6"
        onClick={() => onViewDetails(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded-full text-primary border border-gray-100 uppercase tracking-wider shadow-sm">
            {product.category}
          </span>
        </div>
        
        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="bg-white text-primary p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-auto">
          <h3 
            className="text-lg md:text-2xl font-bold text-gray-900 mb-1 md:mb-2 line-clamp-2 cursor-pointer hover:text-primary transition-colors min-h-[3rem] md:min-h-[4rem]"
            onClick={() => onViewDetails(product)}
          >
            {product.name}
          </h3>
          <p className="text-[11px] md:text-sm text-gray-500 line-clamp-2 mb-3 md:mb-4 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2 md:mt-4 pt-3 md:pt-4 border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-[9px] md:text-sm text-gray-400 font-bold uppercase tracking-tighter">Precio</span>
            <span className="text-xl md:text-3xl font-black text-amber-500">
              ${product.price.toFixed(2)}
            </span>
          </div>
          
          <button
            onClick={() => onAddToCart(product)}
            className="bg-primary text-white p-3 rounded-xl shadow-md hover:bg-primary/90 transition-all transform active:scale-95 group/btn"
            title="Añadir al carrito"
          >
            <ShoppingCart className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
