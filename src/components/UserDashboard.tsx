import { useState } from "react";
import { User, ShoppingBag, FileText, Settings, LogOut, ChevronRight, Package, MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import InvoiceList from "./InvoiceList";
import { UserProfile, Invoice } from "@/types";

interface UserDashboardProps {
  user: UserProfile;
  invoices: Invoice[];
  onLogout: () => void;
}

export default function UserDashboard({ user, invoices, onLogout }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "invoices" | "profile">("overview");

  const menuItems = [
    { id: "overview", label: "Resumen", icon: User },
    { id: "invoices", label: "Mis Compras", icon: FileText },
    { id: "profile", label: "Mi Perfil", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="w-full lg:w-80 bg-white border-r border-gray-100 flex flex-col sticky top-20 h-auto lg:h-[calc(100vh-80px)]">
        <div className="p-8 border-b border-gray-50 flex flex-col items-center text-center">
          <div className="h-24 w-24 rounded-full bg-primary/5 flex items-center justify-center text-primary text-3xl font-bold mb-4 border-4 border-white shadow-lg">
            {user.displayName?.[0] || user.email[0].toUpperCase()}
          </div>
          <h2 className="text-xl font-bold text-gray-900">{user.displayName || "Usuario"}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
          <span className="mt-4 px-3 py-1 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full">
            Cliente TodoExpress
          </span>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all",
                activeTab === item.id 
                  ? "bg-primary text-white shadow-xl shadow-primary/20" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-primary"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
              {activeTab === item.id && <ChevronRight className="ml-auto h-4 w-4" />}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-50">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="h-5 w-5" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900">
            {menuItems.find(i => i.id === activeTab)?.label}
          </h1>
          <p className="text-gray-500 mt-1">
            {activeTab === "overview" ? "Bienvenido a tu espacio personal." : 
             activeTab === "invoices" ? "Historial de tus pedidos realizados." : 
             "Gestiona tu información de contacto."}
          </p>
        </header>

        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-primary p-8 rounded-3xl text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
                <div className="relative z-10">
                  <p className="text-white/60 text-sm font-bold uppercase tracking-widest mb-2">Compras Realizadas</p>
                  <h3 className="text-5xl font-bold mb-6">{invoices.length}</h3>
                  <button 
                    onClick={() => setActiveTab("invoices")}
                    className="bg-white text-primary px-6 py-3 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all flex items-center gap-2"
                  >
                    Ver Historial
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <ShoppingBag className="absolute -right-8 -bottom-8 h-48 w-48 text-white/5 group-hover:scale-110 transition-transform duration-700" />
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Último Pedido</p>
                  {invoices.length > 0 ? (
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        #{invoices[0].id.slice(-6).toUpperCase()}
                      </h3>
                      <p className="text-gray-500 text-sm">Realizado el {new Date(invoices[0].date).toLocaleDateString()}</p>
                    </div>
                  ) : (
                    <p className="text-gray-400 italic">No hay pedidos recientes</p>
                  )}
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-bold text-gray-700">Cuenta Verificada</span>
                </div>
              </div>
            </div>

            {/* Recent Invoices Preview */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-gray-900">Pedidos Recientes</h3>
                <button 
                  onClick={() => setActiveTab("invoices")}
                  className="text-primary text-sm font-bold hover:underline"
                >
                  Ver todos
                </button>
              </div>
              <InvoiceList invoices={invoices.slice(0, 3)} onViewDetails={() => {}} />
            </div>
          </div>
        )}

        {activeTab === "invoices" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <InvoiceList invoices={invoices} onViewDetails={() => {}} />
          </div>
        )}

        {activeTab === "profile" && (
          <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-8">
              <div className="flex items-center gap-6 pb-8 border-b border-gray-50">
                <div className="h-20 w-20 rounded-full bg-primary/5 flex items-center justify-center text-primary text-2xl font-bold">
                  {user.displayName?.[0] || user.email[0].toUpperCase()}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{user.displayName || "Usuario"}</h4>
                  <p className="text-gray-500">{user.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Mail className="h-3 w-3" /> Email
                  </label>
                  <p className="font-bold text-gray-800">{user.email}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Clock className="h-3 w-3" /> Miembro desde
                  </label>
                  <p className="font-bold text-gray-800">{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <MapPin className="h-3 w-3" /> Ubicación
                  </label>
                  <p className="font-bold text-gray-800">San Diego, Carabobo</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Phone className="h-3 w-3" /> Teléfono
                  </label>
                  <p className="font-bold text-gray-400 italic">No registrado</p>
                </div>
              </div>

              <button className="w-full bg-gray-100 text-gray-600 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all mt-8">
                Editar Información
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
