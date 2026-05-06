import React from "react";
import { Banner, Product, MiniBanner } from "@/types";
import BannerCarousel from "./BannerCarousel";
import ProductCard from "./ProductCard";
import { 
  ChevronRight, 
  Sparkles, 
  TrendingUp, 
  Star,
  Tag,
  ShoppingBag,
  ArrowRight,
  Watch,
  Battery,
  User,
  Settings,
  ShieldCheck,
  Clock,
  Briefcase
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface HomeProps {
  banners: Banner[];
  miniBanners: MiniBanner[];
  products: Product[];
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

const FEATURED_CATEGORIES = [
  { name: "Relojes", icon: Watch, color: "text-primary", bg: "bg-primary/5" },
  { name: "Baterías", icon: Battery, color: "text-secondary", bg: "bg-secondary/5" },
  { name: "Accesorios", icon: Settings, color: "text-orange-600", bg: "bg-orange-50" },
  { name: "Repuestos", icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50" },
];

export default function Home({ 
  banners, 
  miniBanners,
  products, 
  onAddToCart, 
  onViewDetails 
}: HomeProps) {
  const activeBanners = banners.filter(b => b.active);
  const activeMiniBanners = miniBanners.filter(b => b.active);
  const featuredProducts = products.slice(0, 4);
  const newArrivals = products.slice(4, 8);

  return (
    <div className="bg-white pb-20">
      {/* Banner Principal - Full Width Responsive */}
      <section className="w-full pt-0">
        <BannerCarousel banners={activeBanners} />
      </section>

      {/* Trust Section - Minimalist 3D Style Icons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            { 
              title: "Productos Originales", 
              desc: "Garantía de calidad y autenticidad en cada producto.",
              img: "https://cdn-icons-png.flaticon.com/512/1067/1067555.png", // Minimalist 3D Shield
              color: "from-blue-500/20 to-transparent"
            },
            { 
              title: "Atención 24/7", 
              desc: "Estamos disponibles para ti en cualquier momento del día.",
              img: "https://cdn-icons-png.flaticon.com/512/3563/3563395.png", // Minimalist 3D Clock
              color: "from-green-500/20 to-transparent"
            },
            { 
              title: "Envío Rápido", 
              desc: "Recibe tus pedidos en la puerta de tu casa rápidamente.",
              img: "https://cdn-icons-png.flaticon.com/512/411/411763.png", // Minimalist 3D Delivery Truck
              color: "from-orange-500/20 to-transparent"
            },
          ].map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center group relative"
            >
              <div className="relative mb-8">
                <div className={cn("absolute inset-0 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500", item.color)} />
                <div className="relative z-10 w-32 h-32 flex items-center justify-center">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">{item.title}</h3>
              <p className="text-gray-500 text-base max-w-[240px] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categorías Destacadas - Minimalist Icons */}
      <section className="bg-gray-50/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-4xl font-black text-gray-900 tracking-tight">Explora por Categoría</h2>
              <p className="text-gray-500 mt-2 text-lg">Encuentra lo que necesitas con facilidad.</p>
            </div>
            <Link to="/shop" className="group text-primary font-bold flex items-center gap-2 hover:underline text-lg">
              Ver todas las categorías <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {FEATURED_CATEGORIES.map((cat, index) => (
              <Link 
                key={cat.name}
                to="/shop"
                className="group bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center"
              >
                <div className={cn("w-20 h-20 rounded-3xl mx-auto mb-8 flex items-center justify-center transition-all duration-300 group-hover:rotate-6", cat.bg)}>
                  <cat.icon className={cn("w-10 h-10", cat.color)} />
                </div>
                <span className="text-xl font-black text-gray-900 group-hover:text-primary transition-colors">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-2xl">
                <Star className="w-6 h-6 text-primary fill-primary" />
              </div>
              <h2 className="text-3xl font-black text-gray-900">Productos Destacados</h2>
            </div>
            <Link to="/shop" className="bg-primary text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-primary/90 transition-all flex items-center gap-2">
              Ver Tienda <ShoppingBag className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart} 
                onViewDetails={onViewDetails} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Banners Promocionales Pequeños - Dynamic with Background Images */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {activeMiniBanners.map((banner) => (
            <div 
              key={banner.id}
              className={cn("relative h-80 rounded-[3rem] overflow-hidden group cursor-pointer shadow-2xl", banner.color)}
            >
              <img 
                src={banner.image} 
                alt={banner.title} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent p-12 flex flex-col justify-center">
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="text-white/90 text-sm font-black uppercase tracking-[0.2em] mb-3"
                >
                  {banner.subtitle}
                </motion.span>
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl font-black text-white mb-8 max-w-[280px] leading-tight"
                >
                  {banner.title}
                </motion.h3>
                <Link to={banner.link} className="bg-white text-gray-900 w-fit px-8 py-4 rounded-2xl font-black text-base hover:bg-gray-100 hover:scale-105 transition-all flex items-center gap-3 shadow-lg">
                  Ver Ofertas <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Novedades */}
      <section className="py-20 bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-secondary/10 rounded-2xl">
                <Sparkles className="w-6 h-6 text-secondary fill-secondary" />
              </div>
              <h2 className="text-3xl font-black text-gray-900">Novedades</h2>
            </div>
            <Link to="/shop" className="text-primary font-bold flex items-center gap-2 hover:underline">
              Explorar todo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart} 
                onViewDetails={onViewDetails} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / Promo Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-8">
              <Tag className="w-4 h-4" /> Promoción Especial
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              ¿Necesitas ayuda con tu pedido?
            </h2>
            <p className="text-white/80 text-lg mb-10">
              Contamos con servicio técnico especializado para el mantenimiento y reparación de tus relojes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary px-10 py-5 rounded-2xl font-black text-lg hover:bg-gray-50 transition-all shadow-xl">
                Consultar Servicio Técnico
              </button>
              <button className="bg-primary border-2 border-white/20 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-all">
                Ver Preguntas Frecuentes
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
