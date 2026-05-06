import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import CartSidebar from "./CartSidebar";
import ProductDetails from "./ProductDetails";
import { Product, CartItem } from "@/types";

interface LayoutProps {
  cartCount: number;
  user: any;
  onLogout: () => void;
  onSelectCategory: (category: string) => void;
  isCartOpen: boolean;
  onCloseCart: () => void;
  cartItems: CartItem[];
  onUpdateCartQuantity: (id: string, delta: number) => void;
  onRemoveFromCart: (id: string) => void;
  onCheckout: () => void;
  selectedProduct: Product | null;
  onCloseProductDetails: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function Layout({
  cartCount,
  user,
  onLogout,
  onSelectCategory,
  isCartOpen,
  onCloseCart,
  cartItems,
  onUpdateCartQuantity,
  onRemoveFromCart,
  onCheckout,
  selectedProduct,
  onCloseProductDetails,
  onAddToCart,
}: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-primary/20 selection:text-primary">
      <Header 
        cartCount={cartCount} 
        user={user} 
        onLogout={onLogout} 
        onSelectCategory={onSelectCategory}
      />
      
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      
      <WhatsAppButton />
      
      <CartSidebar
        isOpen={isCartOpen}
        onClose={onCloseCart}
        items={cartItems}
        onUpdateQuantity={onUpdateCartQuantity}
        onRemoveItem={onRemoveFromCart}
        onCheckout={onCheckout}
      />

      <ProductDetails
        product={selectedProduct}
        onClose={onCloseProductDetails}
        onAddToCart={onAddToCart}
      />
    </div>
  );
}
