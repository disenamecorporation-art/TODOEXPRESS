import React from "react";
import { Banner, Product, MiniBanner, Category } from "@/types";
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
  Gem,
  ShieldCheck,
  Clock,
  LayoutGrid
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface HomeProps {
  banners: Banner[];
  miniBanners: MiniBanner[];
  categories: Category[];
  products: Product[];
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onSelectCategory: (category: string) => void;
}

export default function Home({ 
  banners, 
  miniBanners,
  categories,
  products, 
  onAddToCart, 
  onViewDetails,
  onSelectCategory
}: HomeProps) {
  const activeBanners = banners.filter(b => b.active);
  const activeMiniBanners = miniBanners.filter(b => b.active);
  const featuredProducts = products.slice(0, 4);
  const newArrivals = products.slice(4, 8);

  // Map categories for featured section
  const getCategoryTheme = (name: string) => {
    const themes: { [key: string]: { icon: any, color: string, bg: string } } = {
      "Relojes y Servicios Relojeria": { icon: Watch, color: "text-primary", bg: "bg-primary/5" },
      "Baterías": { icon: Battery, color: "text-secondary", bg: "bg-secondary/5" },
      "Accesorios": { icon: Gem, color: "text-orange-600", bg: "bg-orange-50" },
      "Cosmeticos y Perfumes": { icon: Sparkles, color: "text-blue-600", bg: "bg-blue-50" },
    };
    return themes[name] || { icon: Tag, color: "text-gray-600", bg: "bg-gray-100" };
  };

  const featuredCats = categories.length > 0 ? categories.slice(0, 4).map(c => ({
    name: c.name,
    ...getCategoryTheme(c.name)
  })) : [];

  return (
    <div className="bg-white pb-20">
      {/* Banner Principal - Full Width Responsive */}
      <section className="w-full pt-0">
        <BannerCarousel banners={activeBanners} />
      </section>

      {/* Trust Section - Minimalist 3D Style Icons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
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
              className="flex flex-col items-center text-center group relative p-6 bg-gray-50/50 md:bg-transparent rounded-3xl md:rounded-none"
            >
              <div className="relative mb-6 md:mb-8">
                <div className={cn("absolute inset-0 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500", item.color)} />
                <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)] transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-2 md:mb-3 tracking-tight">{item.title}</h3>
              <p className="text-sm md:text-base text-gray-500 max-w-[240px] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categorías Destacadas - Minimalist Icons */}
      <section className="bg-gray-50/50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 md:mb-16 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Explora por Categoría</h2>
              <p className="text-sm md:text-lg text-gray-500 mt-1 md:mt-2">Encuentra lo que necesitas con facilidad.</p>
            </div>
            <Link to="/shop" className="group text-primary font-bold flex items-center gap-2 hover:underline text-base md:text-lg">
              Ver todas <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {featuredCats.map((cat, index) => (
              <Link 
                key={cat.name}
                to="/shop"
                onClick={() => onSelectCategory(cat.name)}
                className="group bg-white p-4 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center flex flex-col items-center"
              >
                <div className={cn("w-10 h-10 md:w-20 md:h-20 rounded-2xl md:rounded-3xl mx-auto mb-3 md:mb-8 flex items-center justify-center transition-all duration-300 group-hover:rotate-6", cat.bg)}>
                  <cat.icon className={cn("w-5 h-5 md:w-10 md:h-10", cat.color)} />
                </div>
                <span className="text-[10px] md:text-xl font-black text-gray-900 group-hover:text-primary transition-colors leading-tight min-h-[2rem] flex items-center justify-center">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-12 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 md:p-3 bg-primary/10 rounded-xl md:rounded-2xl">
                <Star className="w-5 h-5 md:w-6 md:h-6 text-primary fill-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900">Productos Destacados</h2>
            </div>
            <Link to="/shop" className="bg-primary text-white px-5 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-bold shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 text-sm md:text-base">
              Ver Tienda <ShoppingBag className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
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
              className={cn("relative h-64 md:h-80 rounded-[2rem] md:rounded-[3rem] overflow-hidden group cursor-pointer shadow-2xl", banner.color)}
            >
              <img 
                src={banner.image} 
                alt={banner.title} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent p-8 md:p-12 flex flex-col justify-center">
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
                  className="text-2xl md:text-4xl font-black text-white mb-6 md:mb-8 max-w-[280px] leading-tight"
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
      <section className="py-12 md:py-20 bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-12 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 md:p-3 bg-secondary/10 rounded-xl md:rounded-2xl">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-secondary fill-secondary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900">Novedades</h2>
            </div>
            <Link to="/shop" className="text-primary font-bold flex items-center gap-2 hover:underline text-sm md:text-base">
              Explorar todo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="bg-primary rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-white text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 md:mb-8">
              <Tag className="w-3 h-3 md:w-4 md:h-4" /> Promoción Especial
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 md:mb-6 leading-tight">
              ¿Necesitas ayuda con tu pedido?
            </h2>
            <p className="text-white/80 text-base md:text-lg mb-8 md:mb-10">
              Contamos con servicio técnico especializado para el mantenimiento y reparación de tus relojes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary px-6 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-base md:text-lg hover:bg-gray-50 transition-all shadow-xl">
                Consultar Servicio Técnico
              </button>
              <button className="bg-primary border-2 border-white/20 text-white px-6 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-base md:text-lg hover:bg-white/10 transition-all">
                Ver Preguntas Frecuentes
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
