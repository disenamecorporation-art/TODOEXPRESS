import { Watch, Battery, Settings, Briefcase, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "Relojes", icon: Watch, color: "text-primary", bg: "bg-primary/5" },
  { id: "Baterías", icon: Battery, color: "text-secondary", bg: "bg-secondary/5" },
  { id: "Accesorios", icon: Settings, color: "text-orange-600", bg: "bg-orange-50" },
  { id: "Repuestos", icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50" },
];

interface CategoryBarProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryBar({ activeCategory, onSelectCategory }: CategoryBarProps) {
  return (
    <div className="bg-white border-b border-gray-100 py-6 sticky top-20 z-40 shadow-sm overflow-x-auto no-scrollbar">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center gap-4 md:gap-8 min-w-max">
          <button
            onClick={() => onSelectCategory("Todos")}
            className={cn(
              "flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap",
              activeCategory === "Todos" 
                ? "bg-primary text-white shadow-lg shadow-primary/20" 
                : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-primary"
            )}
          >
            Todos los Productos
          </button>
          
          <div className="h-8 w-px bg-gray-200" />

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={cn(
                "flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap group",
                activeCategory === cat.id 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-primary"
              )}
            >
              <div className={cn(
                "p-1.5 rounded-lg transition-colors",
                activeCategory === cat.id ? "bg-white/20 text-white" : cn(cat.bg, cat.color)
              )}>
                <cat.icon className="h-4 w-4" />
              </div>
              {cat.id}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
