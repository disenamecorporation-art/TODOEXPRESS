import React, { useState } from "react";
import { MiniBanner } from "@/types";
import { Plus, Trash2, Edit2, Check, X, Image as ImageIcon, Link as LinkIcon, Type, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminMiniBannersProps {
  miniBanners: MiniBanner[];
  onUpdateMiniBanner: (id: string, updates: Partial<MiniBanner>) => void;
}

export default function AdminMiniBanners({ miniBanners, onUpdateMiniBanner }: AdminMiniBannersProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<MiniBanner>>({});

  const handleEdit = (banner: MiniBanner) => {
    setEditingId(banner.id);
    setEditForm(banner);
  };

  const handleSave = () => {
    if (editingId) {
      onUpdateMiniBanner(editingId, editForm);
      setEditingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Banners Promocionales Pequeños</h2>
          <p className="text-gray-500">Gestiona los dos banners destacados de la página de inicio.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {miniBanners.map((banner) => (
          <div key={banner.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="aspect-video relative group">
              <img 
                src={banner.image} 
                alt={banner.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleEdit(banner)}
                  className="bg-white text-gray-900 p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {editingId === banner.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase">Título</label>
                      <div className="relative">
                        <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                          type="text" 
                          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                          value={editForm.title || ""}
                          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase">Subtítulo</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                        value={editForm.subtitle || ""}
                        onChange={(e) => setEditForm({ ...editForm, subtitle: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase">Enlace</label>
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                          type="text" 
                          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                          value={editForm.link || ""}
                          onChange={(e) => setEditForm({ ...editForm, link: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase">URL Imagen</label>
                      <div className="relative">
                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                          type="text" 
                          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                          value={editForm.image || ""}
                          onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase">Color de Fondo (Clase Tailwind)</label>
                      <div className="relative">
                        <Palette className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                          type="text" 
                          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                          value={editForm.color || ""}
                          onChange={(e) => setEditForm({ ...editForm, color: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button 
                      onClick={handleSave}
                      className="flex-1 bg-primary text-white py-2 rounded-xl font-bold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" /> Guardar
                    </button>
                    <button 
                      onClick={() => setEditingId(null)}
                      className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-xs font-bold text-primary uppercase tracking-wider">{banner.subtitle}</p>
                  <h4 className="text-lg font-black text-gray-900">{banner.title}</h4>
                  <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
                    <div className={cn("w-3 h-3 rounded-full", banner.color)} />
                    <span>{banner.color}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
