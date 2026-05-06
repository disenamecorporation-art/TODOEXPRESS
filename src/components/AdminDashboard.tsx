import { useState } from "react";
import { LayoutDashboard, ShoppingBag, Users, Image as ImageIcon, Settings, LogOut, ChevronRight, Package, FileText, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import AdminBanners from "./AdminBanners";
import AdminUsers from "./AdminUsers";
import AdminProducts from "./AdminProducts";
import AdminInvoices from "./AdminInvoices";
import AdminMiniBanners from "./AdminMiniBanners";
import { Banner, MiniBanner, UserProfile, Product, Invoice } from "@/types";

interface AdminDashboardProps {
  banners: Banner[];
  miniBanners: MiniBanner[];
  users: UserProfile[];
  products: Product[];
  invoices: Invoice[];
  onAddBanner: (banner: Omit<Banner, "id">) => void;
  onUpdateBanner: (id: string, updates: Partial<Banner>) => void;
  onDeleteBanner: (id: string) => void;
  onUpdateMiniBanner: (id: string, updates: Partial<MiniBanner>) => void;
  onUpdateUserRole: (uid: string, role: "user" | "admin") => void;
  onDeleteUser: (uid: string) => void;
  onAddProduct: (product: Omit<Product, "id">) => void;
  onUpdateProduct: (id: string, updates: Partial<Product>) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateInvoiceStatus: (id: string, status: Invoice["status"]) => void;
  onLogout: () => void;
}

export default function AdminDashboard({
  banners,
  miniBanners,
  users,
  products,
  invoices,
  onAddBanner,
  onUpdateBanner,
  onDeleteBanner,
  onUpdateMiniBanner,
  onUpdateUserRole,
  onDeleteUser,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateInvoiceStatus,
  onLogout,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "banners" | "mini-banners" | "users" | "products" | "invoices">("overview");

  const menuItems = [
    { id: "overview", label: "Resumen", icon: LayoutDashboard },
    { id: "banners", label: "Banners Principales", icon: ImageIcon },
    { id: "mini-banners", label: "Banners Pequeños", icon: ImageIcon },
    { id: "products", label: "Inventario", icon: Package },
    { id: "invoices", label: "Pedidos", icon: FileText },
    { id: "users", label: "Usuarios", icon: Users },
  ];

  const stats = [
    { label: "Ventas Totales", value: `$${invoices.reduce((sum, i) => sum + i.total, 0).toFixed(2)}`, icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
    { label: "Pedidos", value: invoices.length, icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Usuarios", value: users.length, icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Productos", value: products.length, icon: Package, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-8 border-b border-white/10">
          <img 
            src="https://i.postimg.cc/t4BQpvJq/weblogo.jpg" 
            alt="TodoExpress" 
            className="h-12 rounded-lg"
            referrerPolicy="no-referrer"
          />
          <p className="text-[10px] uppercase tracking-widest text-white/60 font-bold mt-4">Panel Administrativo</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                activeTab === item.id 
                  ? "bg-white text-primary shadow-lg" 
                  : "text-white/80 hover:bg-white/10"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
              {activeTab === item.id && <ChevronRight className="ml-auto h-4 w-4" />}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-300 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="h-5 w-5" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {menuItems.find(i => i.id === activeTab)?.label}
            </h1>
            <p className="text-gray-500 mt-1">Gestiona tu farmacia digital de forma eficiente.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              AD
            </div>
          </div>
        </header>

        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className={cn("p-4 rounded-xl", stat.bg, stat.color)}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity / Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Pedidos Recientes
                </h3>
                <div className="space-y-4">
                  {invoices.slice(0, 5).map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center text-blue-600 font-bold shadow-sm">
                          #{invoice.id.slice(-4).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-800">${invoice.total.toFixed(2)}</p>
                          <p className="text-xs text-gray-500">{new Date(invoice.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                        invoice.status === 'completed' ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      )}>
                        {invoice.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Package className="h-5 w-5 text-orange-600" />
                  Bajo Stock
                </h3>
                <div className="space-y-4">
                  {products.filter(p => p.stock < 10).slice(0, 5).map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <img src={product.image} className="h-10 w-10 object-contain mix-blend-multiply" referrerPolicy="no-referrer" />
                        <div>
                          <p className="text-sm font-bold text-gray-800">{product.name}</p>
                          <p className="text-xs text-red-500 font-medium">Quedan {product.stock} unidades</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setActiveTab("products")}
                        className="text-primary text-xs font-bold hover:underline"
                      >
                        Reponer
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "banners" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <AdminBanners 
              banners={banners} 
              onAdd={onAddBanner} 
              onUpdate={onUpdateBanner} 
              onDelete={onDeleteBanner} 
            />
          </div>
        )}

        {activeTab === "mini-banners" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <AdminMiniBanners 
              miniBanners={miniBanners} 
              onUpdateMiniBanner={onUpdateMiniBanner} 
            />
          </div>
        )}

        {activeTab === "users" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <AdminUsers 
              users={users} 
              onUpdateRole={onUpdateUserRole} 
              onDelete={onDeleteUser} 
            />
          </div>
        )}

        {activeTab === "products" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <AdminProducts 
              products={products} 
              onAdd={onAddProduct} 
              onUpdate={onUpdateProduct} 
              onDelete={onDeleteProduct} 
            />
          </div>
        )}

        {activeTab === "invoices" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <AdminInvoices 
              invoices={invoices} 
              onUpdateStatus={onUpdateInvoiceStatus} 
            />
          </div>
        )}
      </main>
    </div>
  );
}
