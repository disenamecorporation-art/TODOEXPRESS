import React from "react";
import { cn } from "@/lib/utils";
import { 
  Watch, 
  Battery, 
  Gem, 
  Sparkles, 
  Home, 
  ChevronRight,
  LayoutGrid,
  Tag
} from "lucide-react";
import { Category } from "@/types";

interface CategorySidebarProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  categories: Category[];
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({ activeCategory, onSelectCategory, categories }) => {
  const getIcon = (name: string) => {
    const iconMap: { [key: string]: any } = {
      "Relojes y Servicios Relojeria": Watch,
      "Baterías": Battery,
      "Accesorios": Gem,
      "Cosmeticos y Perfumes": Sparkles,
      "Todos": LayoutGrid
    };
    return iconMap[name] || Tag;
  };

  const dynamicCategories = [
    { name: "Todos", icon: LayoutGrid },
    ...categories.map(c => ({ name: c.name, icon: getIcon(c.name) }))
  ];

  return (
    <div className="w-64 flex-shrink-0 hidden lg:block">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <LayoutGrid className="w-4 h-4 text-primary" />
            Categorías
          </h3>
        </div>
        <nav className="p-2">
          {dynamicCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.name;
            
            return (
              <button
                key={category.name}
                onClick={() => onSelectCategory(category.name)}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 group",
                  isActive 
                    ? "bg-primary/10 text-primary font-semibold" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-primary" : "text-gray-400 group-hover:text-primary"
                  )} />
                  <span className="text-sm">{category.name}</span>
                </div>
                <ChevronRight className={cn(
                  "w-4 h-4 transition-transform",
                  isActive ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                )} />
              </button>
            );
          })}
        </nav>
        
        <div className="p-4 mt-4 bg-primary/5 mx-2 mb-2 rounded-lg border border-primary/10">
          <p className="text-xs text-primary font-medium mb-1">¿Necesitas ayuda?</p>
          <p className="text-[10px] text-gray-500 leading-relaxed">
            Nuestro equipo técnico está disponible para asesorarte sobre tu reloj.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;
