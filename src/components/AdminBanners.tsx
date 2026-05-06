import { useState } from "react";
import { Plus, Trash2, Edit2, Check, X, Image as ImageIcon, Link as LinkIcon, Eye, EyeOff } from "lucide-react";
import { Banner } from "@/types";
import { cn } from "@/lib/utils";

interface AdminBannersProps {
  banners: Banner[];
  onAdd: (banner: Omit<Banner, "id">) => void;
  onUpdate: (id: string, updates: Partial<Banner>) => void;
  onDelete: (id: string) => void;
}

export default function AdminBanners({ banners, onAdd, onUpdate, onDelete }: AdminBannersProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newBanner, setNewBanner] = useState({ image: "", link: "", active: true });

  const handleAdd = () => {
    if (newBanner.image) {
      onAdd(newBanner);
      setNewBanner({ image: "", link: "", active: true });
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-primary">Gestión de Banners</h3>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-all font-bold"
        >
          {isAdding ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {isAdding ? "Cancelar" : "Nuevo Banner"}
        </button>
      </div>

      {isAdding && (
        <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">URL de Imagen</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none"
                  value={newBanner.image}
                  onChange={(e) => setNewBanner({ ...newBanner, image: e.target.value })}
                />
                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Enlace (Opcional)</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="/ofertas"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none"
                  value={newBanner.link}
                  onChange={(e) => setNewBanner({ ...newBanner, link: e.target.value })}
                />
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          <button
            onClick={handleAdd}
            disabled={!newBanner.image}
            className="w-full bg-primary text-white py-2 rounded-lg font-bold hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            Guardar Banner
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div key={banner.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden group">
            <div className="relative aspect-video">
              <img
                src={banner.image}
                alt="Banner Preview"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => onUpdate(banner.id, { active: !banner.active })}
                  className="p-2 bg-white text-primary rounded-full hover:bg-primary hover:text-white transition-all"
                  title={banner.active ? "Desactivar" : "Activar"}
                >
                  {banner.active ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                </button>
                <button
                  onClick={() => onDelete(banner.id)}
                  className="p-2 bg-white text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all"
                  title="Eliminar"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
              {!banner.active && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
                  Inactivo
                </div>
              )}
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-500 truncate mb-1">URL: {banner.image}</p>
              <p className="text-xs text-gray-500 truncate">Link: {banner.link || "Ninguno"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
