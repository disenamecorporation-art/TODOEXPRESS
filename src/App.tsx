import { useState, useEffect, useRef } from "react";
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
  { id: "1", name: "Reloj Casio Clásico F-91W", description: "El legendario Casio con cronómetro, alarma y luz. Resistente al agua.", price: 25.00, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop", category: "Relojes y Servicios Relojeria", stock: 100 },
  { id: "2", name: "Reloj Mulco Azul Chrono", description: "Elegante cronógrafo con correa de silicona azul y detalles en oro rosa.", price: 185.00, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop", category: "Relojes y Servicios Relojeria", stock: 15 },
  { id: "3", name: "Reloj Victorinox Maverick", description: "Reloj suizo de alta precisión con cristal de zafiro y acero inoxidable.", price: 450.00, image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=400&h=400&fit=crop", category: "Relojes y Servicios Relojeria", stock: 10 },
  { id: "4", name: "Batería Renata 377 (SR626SW)", description: "Batería de óxido de plata de alta calidad, fabricada en Suiza. Larga duración.", price: 3.50, image: "https://images.unsplash.com/photo-1619641621711-309ea83187ca?w=400&h=400&fit=crop", category: "Baterías", stock: 500 },
  { id: "5", name: "Correa de Cuero Genuino 20mm", description: "Correa de cuero marrón de alta calidad para relojes tradicionales.", price: 15.00, image: "https://images.unsplash.com/photo-1622434641406-a15812345ad1?w=400&h=400&fit=crop", category: "Accesorios", stock: 40 },
  { id: "6", name: "Reloj Casio G-Shock GW-B5600", description: "G-Shock con Bluetooth, solar y radiocontrolado. Máxima resistencia.", price: 120.00, image: "https://images.unsplash.com/photo-1547996160-81dfa63595dd?w=400&h=400&fit=crop", category: "Relojes y Servicios Relojeria", stock: 20 },
  { id: "7", name: "Perfume Nautica Voyage", description: "Fragancia fresca y marina para hombre, perfecta para el uso diario.", price: 45.00, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop", category: "Cosmeticos y Perfumes", stock: 30 },
  { id: "8", name: "Estuche para 6 Relojes", description: "Elegante caja de madera con interior de terciopelo para proteger su colección.", price: 35.00, image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=400&h=400&fit=crop", category: "Accesorios", stock: 12 },
];

const MOCK_BANNERS: Banner[] = [
  { 
    id: "2", 
    image: "https://i.postimg.cc/T2BHqMLm/Chat-GPT-Image-6-may-2026-12-39-40-p-m.png", 
    mobileImage: "https://i.postimg.cc/hPWbrwYK/banner1-movil.jpg",
    link: "/shop", 
    active: true 
  },
  { 
    id: "3", 
    image: "https://i.postimg.cc/0y4v7HsB/Chat-GPT-Image-6-may-2026-12-32-03-p-m.png", 
    mobileImage: "https://i.postimg.cc/8PQBH3Yp/banner2.jpg",
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
  const [isConfigured] = useState(!!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [banners, setBanners] = useState<Banner[]>(MOCK_BANNERS);
  const [miniBanners, setMiniBanners] = useState<MiniBanner[]>(MOCK_MINI_BANNERS);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const isFetchingProfile = useRef(false);

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
    let mounted = true;

    // Escuchar cambios de sesión
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      if (session) {
        fetchProfile(session.user.id);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    // Carga inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        if (session) {
          fetchProfile(session.user.id);
        } else {
          setIsLoading(false);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function fetchProfile(uid: string) {
    if (!uid) {
      setIsLoading(false);
      return;
    }
    
    try {
      // Intentar obtener el perfil
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', uid)
        .maybeSingle();

      if (profileError) throw profileError;

      // Si no existe, intentamos crearlo (fallback si el trigger falló)
      if (!profile) {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          const { error: insertError } = await supabase.from('profiles').insert({
            id: authUser.id,
            email: authUser.email!,
            display_name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0],
            role: 'user'
          });
          
          if (!insertError) {
            // Reintentar una vez tras el insert
            const { data: newProfile } = await supabase.from('profiles').select('*').eq('id', uid).single();
            if (newProfile) return handleSetProfile(newProfile);
          }
        }
      } else {
        handleSetProfile(profile);
      }
    } catch (err) {
      console.error("fetchProfile error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSetProfile(profile: any) {
    setUser({
      uid: profile.id,
      email: profile.email,
      displayName: profile.display_name || profile.email?.split('@')[0],
      role: (profile.role as any) || 'user',
      createdAt: profile.created_at
    });

    // Cargar facturas del usuario
    supabase.from('invoices')
      .select('*, items:invoice_items(*)')
      .eq('user_id', profile.id)
      .then(({ data }) => data && setInvoices(data as any));

    // Si es admin, cargar todo
    if (profile.role === 'admin') {
      supabase.from('profiles').select('*').then(({ data }) => {
        if (data) setUsers(data.map(u => ({
          uid: u.id,
          email: u.email,
          displayName: u.display_name || u.email?.split('@')[0],
          role: (u.role as any) || 'user',
          createdAt: u.created_at
        })));
      });
      supabase.from('invoices').select('*, items:invoice_items(*)').then(({ data }) => {
        if (data) setInvoices(data as any);
      });
    }

    if (window.location.pathname === "/login" || window.location.pathname === "/register") {
      navigate("/dashboard");
    }
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
    try {
      const { data: loginData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        alert(error.message);
      } else if (loginData.user) {
        await fetchProfile(loginData.user.id);
      }
    } catch (err: any) {
      console.error("Login Error:", err);
      alert("Error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: any) => {
    setIsLoading(true);
    try {
      const { data: signUpData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.displayName
          }
        }
      });

      if (error) {
        alert("Error de registro: " + error.message);
      } else if (signUpData.session) {
        await fetchProfile(signUpData.user!.id);
      } else {
        alert("¡Registro exitoso! Revisa tu correo o intenta iniciar sesión.");
        navigate("/login");
      }
    } catch (err: any) {
      console.error("Register Error:", err);
      alert("Error inesperado: " + err.message);
    } finally {
      setIsLoading(false);
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

  if (!isConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 text-center">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-red-100">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Configuración Pendiente</h1>
          <p className="text-gray-600 mb-8">
            Para que la tienda funcione con tu nueva base de datos, debes configurar las claves de Supabase.
          </p>
          <div className="space-y-4 text-left">
            <div className="p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
              <p className="font-semibold mb-2 flex items-center gap-2">
                <span className="w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center text-[10px]">1</span>
                Ve al menú <strong>Settings</strong> (arriba a la derecha o abajo en la barra lateral).
              </p>
              <p className="font-semibold mb-2 flex items-center gap-2">
                <span className="w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center text-[10px]">2</span>
                Busca la sección <strong>Secrets</strong> o <strong>Environment Variables</strong>.
              </p>
              <p className="font-semibold mb-2 flex items-center gap-2">
                <span className="w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center text-[10px]">3</span>
                Agrega <code>VITE_SUPABASE_URL</code> y <code>VITE_SUPABASE_ANON_KEY</code>.
              </p>
              <p className="font-semibold flex items-center gap-2">
                <span className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center text-[10px]">4</span>
                Ejecuta el <strong>SQL</strong> (sin DROPS) en el panel de Supabase.
              </p>
            </div>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="mt-8 w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-opacity-90 transition-all shadow-lg active:scale-95"
          >
            Ya las puse, recargar aplicación
          </button>
        </div>
      </div>
    );
  }

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
            onSelectCategory={handleSelectCategory}
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
          user ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} isLoading={isLoading} />
        } />
        <Route path="/register" element={
          user ? <Navigate to="/dashboard" replace /> : <Register onRegister={handleRegister} isLoading={isLoading} />
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
