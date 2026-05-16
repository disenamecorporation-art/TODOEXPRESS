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
import AuthForm from "./components/AuthForm";
import { supabase } from "./lib/supabase";

// Mock Data for fallback
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
  { 
    id: "2", 
    image: "https://i.postimg.cc/T2BHqMLm/Chat-GPT-Image-6-may-2026-12-39-40-p-m.png", 
    mobileImage: "https://i.postimg.cc/q7QJfr86/banner1-movil.jpg",
    link: "/shop", 
    active: true 
  },
  { 
    id: "3", 
    image: "https://i.postimg.cc/0y4v7HsB/Chat-GPT-Image-6-may-2026-12-32-03-p-m.png", 
    mobileImage: "https://i.postimg.cc/9f1m32Gy/banner2.jpg",
    link: "/shop", 
    active: true 
  },
];

const MOCK_MINI_BANNERS: MiniBanner[] = [
  { id: "m1", image: "https://i.postimg.cc/7LTk9MHm/Chat-GPT-Image-6-may-2026-12-30-52-p-m.png", title: "Relojes Clásicos", subtitle: "Resistencia Extrema", link: "/shop", color: "bg-primary", active: true },
  { id: "m2", image: "https://i.postimg.cc/0y4v7HsB/Chat-GPT-Image-6-may-2026-12-32-03-p-m.png", title: "Baterías Suizas", subtitle: "Calidad Garantizada", link: "/shop", color: "bg-secondary", active: true },
];

function AppContent() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [banners, setBanners] = useState<Banner[]>(MOCK_BANNERS);
  const [miniBanners, setMiniBanners] = useState<MiniBanner[]>(MOCK_MINI_BANNERS);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);

  // 1. Fetch Static Data
  useEffect(() => {
    async function fetchData() {
      // Products
      const { data: productsData } = await supabase.from('products').select('*');
      if (productsData && productsData.length > 0) setProducts(productsData);

      // Banners
      const { data: bannersData } = await supabase.from('banners').select('*');
      if (bannersData && bannersData.length > 0) setBanners(bannersData);

      // Mini Banners
      const { data: miniBannersData } = await supabase.from('mini_banners').select('*');
      if (miniBannersData && miniBannersData.length > 0) setMiniBanners(miniBannersData);
    }
    fetchData();
  }, []);

  // 2. Auth Session Management
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        fetchProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        fetchProfile(session.user.id);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(uid: string) {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', uid)
      .single();
    
    if (data) {
      setUser({
        uid: data.id,
        email: data.email,
        displayName: data.display_name,
        role: data.role,
        createdAt: data.created_at
      });
      
      // Fetch invoices for this user
      const { data: invoicesData } = await supabase
        .from('invoices')
        .select('*, items:invoice_items(*)')
        .eq('user_id', uid);
      if (invoicesData) setInvoices(invoicesData);

      // If admin, fetch all users
      if (data.role === 'admin') {
        const { data: allUsers } = await supabase.from('profiles').select('*');
        if (allUsers) {
          setUsers(allUsers.map(u => ({
            uid: u.id,
            email: u.email,
            displayName: u.display_name,
            role: u.role,
            createdAt: u.created_at
          })));
        }
        
        // Fetch all invoices for admin
        const { data: allInvoices } = await supabase.from('invoices').select('*, items:invoice_items(*)');
        if (allInvoices) setInvoices(allInvoices);
      }
    }
    setIsLoading(false);
  }

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

  const handleCheckout = async () => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const message = `*Nuevo Pedido TodoExpress*\n\n` +
      cartItems.map(item => `- ${item.name} x${item.quantity} ($${(item.price * item.quantity).toFixed(2)})`).join('\n') +
      `\n\n*Total: $${total.toFixed(2)}*\n\n` +
      `Cliente: ${user?.displayName || 'Invitado'}\n` +
      `Email: ${user?.email || 'No proporcionado'}`;
    
    const phoneNumber = "584244339492";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');

    // Create invoice in Supabase if logged in
    if (user) {
      const { data: invoiceData, error: invError } = await supabase
        .from('invoices')
        .insert({
          user_id: user.uid,
          total,
          status: 'pending'
        })
        .select()
        .single();
      
      if (invoiceData) {
        const itemsToInsert = cartItems.map(item => ({
          invoice_id: invoiceData.id,
          product_id: item.id,
          product_name: item.name,
          quantity: item.quantity,
          price: item.price
        }));

        await supabase.from('invoice_items').insert(itemsToInsert);
        
        // Refresh invoices
        fetchProfile(user.uid);
      }
    }
    
    setCartItems([]);
    setIsCartOpen(false);
  };

  // Auth Logic with Supabase
  const handleLogin = async (data: any) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) {
      alert(error.message);
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: any) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.displayName,
        },
      },
    });
    if (error) {
      alert(error.message);
      setIsLoading(false);
    } else {
      alert("¡Registro exitoso! Por favor revisa tu correo para confirmar tu cuenta.");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleUpdateProfile = async (updates: any) => {
    if (!user) return;
    const { error } = await supabase
      .from('profiles')
      .update({
        display_name: updates.displayName,
        email: updates.email
      })
      .eq('id', user.uid);
    
    if (!error) {
      await fetchProfile(user.uid);
      alert("Perfil actualizado correctamente");
    } else {
      alert(error.message);
    }
  };

  const handleSelectCategory = (category: string) => {
    setActiveCategory(category);
    navigate("/shop");
  };

  // Admin Supabase Logic
  const handleAddProduct = async (p: any) => {
    const { error } = await supabase.from('products').insert(p);
    if (!error) {
      const { data } = await supabase.from('products').select('*');
      if (data) setProducts(data);
    }
  };

  const handleUpdateProduct = async (id: string, updates: any) => {
    const { error } = await supabase.from('products').update(updates).eq('id', id);
    if (!error) {
      const { data } = await supabase.from('products').select('*');
      if (data) setProducts(data);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleAddBanner = async (b: any) => {
    const { error } = await supabase.from('banners').insert(b);
    if (!error) {
      const { data } = await supabase.from('banners').select('*');
      if (data) setBanners(data);
    }
  };

  const handleUpdateBanner = async (id: string, updates: any) => {
    const { error } = await supabase.from('banners').update(updates).eq('id', id);
    if (!error) {
      const { data } = await supabase.from('banners').select('*');
      if (data) setBanners(data);
    }
  };

  const handleDeleteBanner = async (id: string) => {
    const { error } = await supabase.from('banners').delete().eq('id', id);
    if (!error) {
      setBanners(banners.filter(b => b.id !== id));
    }
  };

  const handleUpdateUserRole = async (uid: string, role: string) => {
    const { error } = await supabase.from('profiles').update({ role }).eq('id', uid);
    if (!error) {
      setUsers(users.map(u => u.uid === uid ? { ...u, role: role as any } : u));
    }
  };

  const handleUpdateInvoiceStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('invoices').update({ status }).eq('id', id);
    if (!error) {
      setInvoices(invoices.map(i => i.id === id ? { ...i, status: status as any } : i));
    }
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
        <Route path="/forgot-password" element={
          user ? <Navigate to="/" replace /> : (
            <div className="min-h-[80vh] flex items-center justify-center bg-gray-50/50 py-12 px-4">
              <AuthForm 
                type="forgot-password" 
                onSubmit={async (data) => {
                  const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
                    redirectTo: `${window.location.origin}/dashboard`,
                  });
                  if (error) {
                    alert(error.message);
                  } else {
                    alert(`Si el correo ${data.email} existe, se enviaron instrucciones para recuperar la contraseña.`);
                    navigate("/login");
                  }
                }} 
              />
            </div>
          )
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
              onUpdateProfile={handleUpdateProfile}
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
            onAddBanner={handleAddBanner}
            onUpdateBanner={handleUpdateBanner}
            onDeleteBanner={handleDeleteBanner}
            onUpdateMiniBanner={async (id, updates) => {
              const { error } = await supabase.from('mini_banners').update(updates).eq('id', id);
              if (!error) {
                const { data } = await supabase.from('mini_banners').select('*');
                if (data) setMiniBanners(data);
              }
            }}
            onUpdateUserRole={handleUpdateUserRole}
            onDeleteUser={async (uid) => {
              const { error } = await supabase.from('profiles').delete().eq('id', uid);
              if (!error) setUsers(users.filter(u => u.uid !== uid));
            }}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateInvoiceStatus={handleUpdateInvoiceStatus}
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
