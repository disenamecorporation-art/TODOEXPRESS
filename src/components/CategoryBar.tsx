import { Watch, Battery, Gem, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "Relojes y Servicios Relojeria", icon: Watch, color: "text-primary", bg: "bg-primary/5" },
  { id: "Baterías", icon: Battery, color: "text-secondary", bg: "bg-secondary/5" },
  { id: "Accesorios", icon: Gem, color: "text-orange-600", bg: "bg-orange-50" },
  { id: "Cosmeticos y Perfumes", icon: Sparkles, color: "text-blue-600", bg: "bg-blue-50" },
];

interface CategoryBarProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryBar({ activeCategory, onSelectCategory }: CategoryBarProps) {
  return (
    <div className="bg-white border-b border-gray-100 py-3 md:py-6 sticky top-16 md:top-20 z-40 shadow-sm overflow-x-auto no-scrollbar">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center gap-3 md:gap-8 min-w-max">
          <button
            onClick={() => onSelectCategory("Todos")}
            className={cn(
              "flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-[11px] md:text-sm font-bold transition-all whitespace-nowrap",
              activeCategory === "Todos" 
                ? "bg-primary text-white shadow-lg shadow-primary/20" 
                : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-primary border border-gray-100"
            )}
          >
            Todos
          </button>
          
          <div className="h-6 md:h-8 w-px bg-gray-200" />

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={cn(
                "flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-[11px] md:text-sm font-bold transition-all whitespace-nowrap group",
                activeCategory === cat.id 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-primary border border-gray-100"
              )}
            >
              <div className={cn(
                "p-1.5 rounded-lg transition-colors",
                activeCategory === cat.id ? "bg-white/20 text-white" : cn(cat.bg, cat.color)
              )}>
                <cat.icon className="h-3.5 w-3.5 md:h-4 w-4" />
              </div>
              {cat.id}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
