import { ShoppingBag, Trash2, Plus, Minus, Send, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { CartItem } from "@/types";

interface CartPageProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export default function CartPage({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartPageProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 lg:px-8 py-20 text-center">
        <div className="max-w-md mx-auto bg-white p-12 rounded-3xl border border-gray-100 shadow-sm">
          <ShoppingBag className="h-20 w-20 text-gray-200 mx-auto mb-6 opacity-20" />
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Tu carrito está vacío</h2>
          <p className="text-gray-500 mb-8">Parece que aún no has añadido ningún producto a tu carrito de compras.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#003366] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#004080] transition-all shadow-lg"
          >
            <ArrowLeft className="h-5 w-5" />
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-12 flex items-center gap-4">
        <div className="p-3 bg-blue-50 text-[#003366] rounded-2xl">
          <ShoppingBag className="h-8 w-8" />
        </div>
        Tu Carrito de Compras
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-6 group hover:shadow-md transition-all">
              <div className="h-32 w-32 rounded-2xl bg-gray-50 p-4 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-contain mix-blend-multiply"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{item.category}</p>
                <div className="flex items-center justify-center sm:justify-start gap-6">
                  <div className="flex items-center gap-4 bg-gray-100 rounded-2xl px-4 py-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      disabled={item.quantity <= 1}
                      className="text-gray-500 hover:text-[#003366] disabled:opacity-30"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="text-lg font-bold w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="text-gray-500 hover:text-[#003366]"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-xl"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="text-right min-w-[120px]">
                <p className="text-xs text-gray-400 uppercase font-bold mb-1">Precio</p>
                <p className="text-2xl font-bold text-[#003366]">${(item.price * item.quantity).toFixed(2)}</p>
                <p className="text-[10px] text-gray-400 font-medium">${item.price.toFixed(2)} c/u</p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm sticky top-32">
            <h2 className="text-xl font-bold text-gray-900 mb-8">Resumen del Pedido</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-500">
                <span>Productos ({items.length})</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Envío</span>
                <span className="text-green-600 font-bold">GRATIS</span>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-3xl font-bold text-[#003366]">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full bg-[#25D366] text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-[#128C7E] transition-all shadow-xl shadow-green-900/10 active:scale-95"
            >
              <Send className="h-6 w-6" />
              Finalizar por WhatsApp
            </button>
            
            <p className="text-center text-[10px] text-gray-400 mt-6 uppercase tracking-widest leading-relaxed">
              Al hacer clic, serás redirigido a WhatsApp para completar tu pedido con un asesor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
