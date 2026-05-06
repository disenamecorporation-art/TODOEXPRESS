import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Shop from "./components/Shop";
import Login from "./components/Login";
import Register from "./components/Register";
import CartPage from "./components/CartPage";
import SearchPage from "./components/SearchPage";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout";
import { Product, CartItem, Banner, MiniBanner, UserProfile, Invoice } from "./types";

// Mock Data
const MOCK_PRODUCTS: Product[] = [
  { id: "1", name: "Reloj Casio Clásico F-91W", description: "El legendario Casio con cronómetro, alarma y luz. Resistente al agua.", price: 25.00, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop", category: "Relojes", stock: 100 },
  { id: "2", name: "Reloj Mulco Azul Chrono", description: "Elegante cronógrafo con correa de silicona azul y detalles en oro rosa.", price: 185.00, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop", category: "Relojes", stock: 15 },
  { id: "3", name: "Reloj Victorinox Maverick", description: "Reloj suizo de alta precisión con cristal de zafiro y acero inoxidable.", price: 450.00, image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=400&h=400&fit=crop", category: "Relojes", stock: 10 },
  { id: "4", name: "Batería Renata 377 (SR626SW)", description: "Batería de óxido de plata de alta calidad, fabricada en Suiza. Larga duración.", price: 3.50, image: "https://images.unsplash.com/photo-1619641621711-309ea83187ca?w=400&h=400&fit=crop", category: "Baterías", stock: 500 },
  { id: "5", name: "Correa de Cuero Genuino 20mm", description: "Correa de cuero marrón de alta calidad para relojes tradicionales.", price: 15.00, image: "https://images.unsplash.com/photo-1622434641406-a15812345ad1?w=400&h=400&fit=crop", category: "Accesorios", stock: 40 },
  { id: "6", name: "Reloj Casio G-Shock GW-B5600", description: "G-Shock con Bluetooth, solar y radiocontrolado. Máxima resistencia.", price: 120.00, image: "https://images.unsplash.com/photo-1547996160-81dfa63595dd?w=400&h=400&fit=crop", category: "Relojes", stock: 20 },
  { id: "7", name: "Batería Sony CR2016", description: "Batería de litio ideal para relojes digitales y mandos a distancia.", price: 2.00, image: "https://images.unsplash.com/photo-1629815049360-631d8623cf63?w=400&h=400&fit=crop", category: "Baterías", stock: 200 },
  { id: "8", name: "Estuche para 6 Relojes", description: "Elegante caja de madera con interior de terciopelo para proteger su colección.", price: 35.00, image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=400&h=400&fit=crop", category: "Accesorios", stock: 12 },
];

const MOCK_BANNERS: Banner[] = [
  { id: "2", image: "https://i.postimg.cc/T2BHqMLm/Chat-GPT-Image-6-may-2026-12-39-40-p-m.png", link: "/shop", active: true },
  { id: "3", image: "https://i.postimg.cc/0y4v7HsB/Chat-GPT-Image-6-may-2026-12-32-03-p-m.png", link: "/shop", active: true },
];

const MOCK_MINI_BANNERS: MiniBanner[] = [
  { id: "m1", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400", title: "Relojes Clásicos", subtitle: "Resistencia Extrema", link: "/shop", color: "bg-primary", active: true },
  { id: "m2", image: "https://images.unsplash.com/photo-1619641621711-309ea83187ca?w=400", title: "Baterías Suizas", subtitle: "Calidad Garantizada", link: "/shop", color: "bg-secondary", active: true },
];

function AppContent() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [banners, setBanners] = useState<Banner[]>(MOCK_BANNERS);
  const [miniBanners, setMiniBanners] = useState<MiniBanner[]>(MOCK_MINI_BANNERS);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);

  useEffect(() => {
    localStorage.setItem("todoexpress_mini_banners", JSON.stringify(miniBanners));
  }, [miniBanners]);

  // Cart Logic
  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setIsCartOpen(true);
    setSelectedProduct(null);
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const message = `*Nuevo Pedido TodoExpress*\n\n` +
      cartItems.map(item => `- ${item.name} x${item.quantity} ($${(item.price * item.quantity).toFixed(2)})`).join('\n') +
      `\n\n*Total: $${total.toFixed(2)}*\n\n` +
      `Cliente: ${user?.displayName || 'Invitado'}\n` +
      `Email: ${user?.email || 'No proporcionado'}`;
    
    const phoneNumber = "584248338168";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');

    // Create invoice if logged in
    if (user) {
      const newInvoice: Invoice = {
        id: Math.random().toString(36).substr(2, 9),
        userId: user.uid,
        date: new Date().toISOString(),
        items: [...cartItems],
        total,
        status: 'pending'
      };
      setInvoices([newInvoice, ...invoices]);
    }
    
    setCartItems([]);
    setIsCartOpen(false);
  };

  // Auth Logic (Mock)
  const handleLogin = (data: any) => {
    setIsLoading(true);
    setTimeout(() => {
      const newUser: UserProfile = {
        uid: "user123",
        email: data.email,
        displayName: data.email.split('@')[0],
        role: data.email.includes('admin') ? 'admin' : 'user',
        createdAt: new Date().toISOString()
      };
      setUser(newUser);
      setIsLoading(false);
    }, 1000);
  };

  const handleRegister = (data: any) => {
    setIsLoading(true);
    setTimeout(() => {
      const newUser: UserProfile = {
        uid: "user" + Math.random().toString(36).substr(2, 5),
        email: data.email,
        displayName: data.displayName,
        role: 'user',
        createdAt: new Date().toISOString()
      };
      setUser(newUser);
      setIsLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleSelectCategory = (category: string) => {
    setActiveCategory(category);
    navigate("/shop");
  };

  return (
    <Routes>
      <Route element={
        <Layout 
          cartCount={cartItems.reduce((sum, i) => sum + i.quantity, 0)}
          user={user}
          onLogout={handleLogout}
          onSelectCategory={handleSelectCategory}
          isCartOpen={isCartOpen}
          onCloseCart={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateCartQuantity={updateCartQuantity}
          onRemoveFromCart={removeFromCart}
          onCheckout={handleCheckout}
          selectedProduct={selectedProduct}
          onCloseProductDetails={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      }>
        <Route path="/" element={
          <Home 
            banners={banners}
            miniBanners={miniBanners}
            products={products}
            onAddToCart={(p) => addToCart(p, 1)}
            onViewDetails={setSelectedProduct}
          />
        } />
        <Route path="/shop" element={
          <Shop 
            products={products}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            onAddToCart={(p) => addToCart(p, 1)}
            onViewDetails={setSelectedProduct}
          />
        } />
        <Route path="/login" element={
          user ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} isLoading={isLoading} />
        } />
        <Route path="/register" element={
          user ? <Navigate to="/" replace /> : <Register onRegister={handleRegister} isLoading={isLoading} />
        } />
        <Route path="/cart" element={
          <CartPage 
            items={cartItems} 
            onUpdateQuantity={updateCartQuantity} 
            onRemoveItem={removeFromCart} 
            onCheckout={handleCheckout} 
          />
        } />
        <Route path="/search" element={
          <SearchPage 
            products={products} 
            onAddToCart={(p) => addToCart(p, 1)} 
            onViewDetails={setSelectedProduct} 
          />
        } />

        {/* User Routes */}
        <Route element={<UserLayout user={user} isLoading={isLoading} />}>
          <Route path="/dashboard" element={
            <UserDashboard 
              user={user!} 
              invoices={invoices.filter(i => i.userId === user?.uid)} 
              onLogout={handleLogout} 
            />
          } />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminLayout user={user} isLoading={isLoading} />}>
        <Route path="/admin" element={
          <AdminDashboard 
            banners={banners}
            miniBanners={miniBanners}
            users={users}
            products={products}
            invoices={invoices}
            onAddBanner={(b) => setBanners([...banners, { ...b, id: Math.random().toString() }])}
            onUpdateBanner={(id, updates) => setBanners(banners.map(b => b.id === id ? { ...b, ...updates } : b))}
            onDeleteBanner={(id) => setBanners(banners.filter(b => b.id !== id))}
            onUpdateMiniBanner={(id, updates) => setMiniBanners(miniBanners.map(b => b.id === id ? { ...b, ...updates } : b))}
            onUpdateUserRole={(uid, role) => setUsers(users.map(u => u.uid === uid ? { ...u, role } : u))}
            onDeleteUser={(uid) => setUsers(users.filter(u => u.uid !== uid))}
            onAddProduct={(p) => setProducts([...products, { ...p, id: Math.random().toString() }])}
            onUpdateProduct={(id, updates) => setProducts(products.map(p => p.id === id ? { ...p, ...updates } : p))}
            onDeleteProduct={(id) => setProducts(products.filter(p => p.id !== id))}
            onUpdateInvoiceStatus={(id, status) => setInvoices(invoices.map(i => i.id === id ? { ...i, status } : i))}
            onLogout={handleLogout}
          />
        } />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
