import { X, ShoppingCart, Plus, Minus, ShieldCheck, Truck, RefreshCcw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product } from "@/types";
import { useState } from "react";

interface ProductDetailsProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductDetails({ product, onClose, onAddToCart }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white w-full max-w-5xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200 hover:text-gray-900 transition-all z-10"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Image Section */}
          <div className="w-full md:w-1/2 bg-gray-50 p-12 flex items-center justify-center">
            <motion.img
              layoutId={`product-image-${product.id}`}
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain mix-blend-multiply max-h-[400px]"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Info Section */}
          <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col max-h-[90vh] overflow-y-auto">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/5 px-4 py-1.5 rounded-full mb-4 inline-block">
                {product.category}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                {product.name}
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex items-center gap-6 mb-10">
              <span className="text-3xl font-bold text-amber-500">
                ${product.price.toFixed(2)}
              </span>
              <div className="flex items-center gap-4 bg-gray-100 rounded-2xl px-5 py-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 text-gray-500 hover:text-primary transition-colors"
                >
                  <Minus className="h-5 w-5" />
                </button>
                <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 text-gray-500 hover:text-primary transition-colors"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Aliados Section */}
            <div className="mb-10 p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Servicios Aliados</h3>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { name: "Casio", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Casio_logo.svg/2560px-Casio_logo.svg.png" },
                  { name: "Mulco", logo: "https://www.mulco.com/cdn/shop/files/Logo_Mulco_200x.png?v=1614333333" },
                  { name: "Victorinox", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Victorinox_logo.svg/1024px-Victorinox_logo.svg.png" },
                  { name: "Citizen", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Citizen_Watch_logo.svg/2560px-Citizen_Watch_logo.svg.png" }
                ].map((aliado, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 group cursor-help" title={aliado.name}>
                    <div className="w-full aspect-square bg-white rounded-xl flex items-center justify-center p-2 border border-gray-100 shadow-sm transition-all group-hover:shadow-md group-hover:border-primary/20">
                      <img src={aliado.logo} alt={aliado.name} className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Garantía</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <Truck className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Envío Rápido</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                  <RefreshCcw className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Devolución</span>
              </div>
            </div>

            <button
              onClick={() => onAddToCart(product, quantity)}
              className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 active:scale-95"
            >
              <ShoppingCart className="h-6 w-6" />
              Agregar al Carrito
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
