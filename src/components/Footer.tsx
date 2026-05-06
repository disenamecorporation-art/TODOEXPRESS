import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const brands = [
    { name: "Casio", logo: "https://logo.clearbit.com/casio.com" },
    { name: "Victorinox", logo: "https://logo.clearbit.com/victorinox.com" },
    { name: "Seiko", logo: "https://logo.clearbit.com/seiko.com" },
    { name: "Citizen", logo: "https://logo.clearbit.com/citizenwatch.com" },
    { name: "Fossil", logo: "https://logo.clearbit.com/fossil.com" },
    { name: "Diesel", logo: "https://logo.clearbit.com/diesel.com" },
    { name: "Mulco", logo: "https://www.mulco.com/cdn/shop/files/Logo_Mulco_200x.png?v=1614333333" },
  ];

  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Allies Slider */}
      <div className="bg-white py-8 border-b border-gray-100 overflow-hidden">
        <div className="flex animate-infinite-scroll gap-12 whitespace-nowrap items-center">
          {[...brands, ...brands, ...brands].map((brand, index) => (
            <div key={index} className="flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all px-8">
              <img 
                src={brand.logo} 
                alt={brand.name} 
                className="h-8 md:h-10 w-auto object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <span className="ml-2 font-bold text-gray-400 group-hover:text-primary transition-colors">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-16 pb-8 container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="https://i.postimg.cc/t4BQpvJq/weblogo.jpg" 
                alt="TodoExpress Logo" 
                className="h-16 w-auto rounded-lg"
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Tu tienda de confianza en relojería y accesorios. Especialistas en baterías y repuestos para todas las marcas.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Enlaces Rápidos</h3>
            <ul className="flex flex-col gap-4 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Inicio</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Productos</Link></li>
              <li><Link to="/search" className="hover:text-white transition-colors">Buscar</Link></li>
              <li><Link to="/cart" className="hover:text-white transition-colors">Ver Carrito</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Servicio al Cliente</h3>
            <ul className="flex flex-col gap-4 text-gray-400 text-sm">
              <li><Link to="/faq" className="hover:text-white transition-colors">Preguntas Frecuentes</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Términos y Condiciones</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Política de Privacidad</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contáctanos</h3>
            <ul className="flex flex-col gap-4 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <span>entre Urb. El Morro y La Esmeralda, C.C. San Diego (Fin de Siglo), Galería 2, Local B12, Av. Don Julio Centeno, San Diego, 2006, CA, VE</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span>04244339492</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="truncate">todoexpressfondesiglo@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center text-gray-500 text-xs">
          <p>© {new Date().getFullYear()} TodoExpress. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
