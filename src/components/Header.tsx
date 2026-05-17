import React, { useState } from "react";
import { ShoppingCart, User, Search, Menu, X, LogOut, LayoutDashboard, ChevronDown, Watch, Battery, Gem, Sparkles, Home as HomeIcon, LayoutGrid, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface HeaderProps {
  cartCount: number;
  user: any;
  onLogout: () => void;
  onSelectCategory: (category: string) => void;
}

const DEPARTMENTS = [
  { name: "Todos", icon: LayoutGrid },
  { name: "Relojes y Servicios Relojeria", icon: Watch },
  { name: "Baterías", icon: Battery },
  { name: "Accesorios", icon: Gem },
  { name: "Cosmeticos y Perfumes", icon: Sparkles },
];

export default function Header({ cartCount, user, onLogout, onSelectCategory }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeptOpen, setIsDeptOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      {/* Top Bar - Announcement */}
      <div className="bg-[#FFD700] text-black py-1.5 px-4 text-center text-[11px] font-black uppercase tracking-widest">
        ¡APROVECHA NUESTRAS PROMOCIONES IMPERDIBLES!
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 md:gap-8">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0" onClick={() => onSelectCategory("Todos")}>
            <img 
              src="https://i.postimg.cc/t4BQpvJq/weblogo.jpg" 
              alt="TodoExpress Logo" 
              className="h-14 md:h-18 lg:h-20 w-auto object-contain transition-transform hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="relative group">
              <button 
                onMouseEnter={() => setIsDeptOpen(true)}
                onMouseLeave={() => setIsDeptOpen(false)}
                className="flex items-center gap-2 text-gray-700 font-bold text-sm hover:text-primary transition-colors py-4"
              >
                <Menu className="w-5 h-5" />
                Departamentos
                <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isDeptOpen && "rotate-180")} />
              </button>

              {isDeptOpen && (
                <div 
                  onMouseEnter={() => setIsDeptOpen(true)}
                  onMouseLeave={() => setIsDeptOpen(false)}
                  className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  {DEPARTMENTS.map((dept) => (
                    <button
                      key={dept.name}
                      onClick={() => {
                        onSelectCategory(dept.name);
                        setIsDeptOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors text-left group"
                    >
                      <dept.icon className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                      <span className="font-medium">{dept.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link 
              to="/shop" 
              onClick={() => onSelectCategory("Todos")}
              className="text-gray-700 font-bold text-sm hover:text-primary transition-colors flex items-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Tienda
            </Link>
          </div>

          {/* Search Bar */}
          <form 
            onSubmit={handleSearch}
            className="flex-1 max-w-2xl relative group"
          >
            <input
              type="text"
              placeholder="¿Qué producto necesitas hoy?"
              className="w-full bg-gray-50 pl-12 pr-4 py-3 rounded-2xl border border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-primary transition-colors" />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1.5 rounded-xl text-xs font-bold hover:bg-primary/90 transition-all hidden sm:block"
            >
              Buscar
            </button>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-6">
            <div className="hidden md:flex items-center gap-6">
              {user ? (
                <div className="flex items-center gap-4">
                  <Link 
                    to={user.role === 'admin' ? "/admin" : "/dashboard"} 
                    className="flex flex-col items-start group"
                  >
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Mi Cuenta</span>
                    <div className="flex items-center gap-1.5 text-gray-900 group-hover:text-primary transition-colors">
                      <span className="text-sm font-bold truncate max-w-[100px]">
                        {user.displayName || user.email.split('@')[0]}
                      </span>
                      <ChevronDown className="w-3 h-3" />
                    </div>
                  </Link>
                  <button 
                    onClick={onLogout}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Cerrar sesión"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="flex flex-col items-start group"
                >
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Bienvenido</span>
                  <div className="flex items-center gap-1.5 text-gray-900 group-hover:text-primary transition-colors">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-bold">Iniciar Sesión</span>
                  </div>
                </Link>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative p-2.5 bg-gray-50 rounded-2xl text-gray-700 hover:bg-primary hover:text-white transition-all group">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm group-hover:scale-110 transition-transform">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2.5 bg-gray-50 rounded-2xl text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 py-6 px-4 shadow-2xl animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-2">Departamentos</p>
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept.name}
                onClick={() => {
                  onSelectCategory(dept.name);
                  setIsMenuOpen(false);
                  navigate("/");
                }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 text-gray-700 font-bold hover:bg-primary/10 hover:text-primary transition-all"
              >
                <dept.icon className="w-6 h-6" />
                <span>{dept.name}</span>
              </button>
            ))}
            
            <div className="h-px bg-gray-100 my-4" />
            
            {user ? (
              <>
                <Link 
                  to={user.role === 'admin' ? "/admin" : "/dashboard"} 
                  className="flex items-center gap-4 p-4 rounded-2xl text-gray-700 font-bold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LayoutDashboard className="h-6 w-6" />
                  <span>{user.role === 'admin' ? "Panel de Control" : "Mi Perfil"}</span>
                </Link>
                <button 
                  onClick={() => {
                    onLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-4 p-4 rounded-2xl text-red-600 font-bold"
                >
                  <LogOut className="h-6 w-6" />
                  <span>Cerrar Sesión</span>
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center gap-4 p-4 rounded-2xl bg-primary text-white font-bold shadow-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-6 w-6" />
                <span>Iniciar Sesión / Registro</span>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
