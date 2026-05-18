import { useState } from "react";
import { Plus, Trash2, Edit2, Check, X, Tag } from "lucide-react";
import { Category } from "@/types";

interface AdminCategoriesProps {
  categories: Category[];
  onAdd: (category: { name: string }) => void;
  onUpdate: (id: string, updates: Partial<Category>) => void;
  onDelete: (id: string) => void;
}

export default function AdminCategories({ categories, onAdd, onUpdate, onDelete }: AdminCategoriesProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const handleAdd = () => {
    if (newName.trim()) {
      onAdd({ name: newName.trim() });
      setNewName("");
      setIsAdding(false);
    }
  };

  const handleStartEdit = (category: Category) => {
    setEditingId(category.id);
    setEditName(category.name);
  };

  const handleSaveEdit = () => {
    if (editName.trim() && editingId) {
      onUpdate(editingId, { name: editName.trim() });
      setEditingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-primary">Gestión de Categorías</h3>
          <p className="text-sm text-gray-500">Añade, edita o elimina las categorías de productos.</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-all font-bold"
        >
          {isAdding ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {isAdding ? "Cancelar" : "Nueva Categoría"}
        </button>
      </div>

      {isAdding && (
        <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex gap-4">
            <div className="flex-1 space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Nombre de la Categoría</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ej: Accesorios"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                />
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleAdd}
                disabled={!newName.trim()}
                className="bg-primary text-white h-[42px] px-6 rounded-lg font-bold hover:bg-primary/90 transition-all disabled:opacity-50"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map((category) => (
              <tr key={category.id} className="group hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  {editingId === category.id ? (
                    <input
                      type="text"
                      className="w-full py-1 px-2 border border-primary rounded focus:ring-2 focus:ring-primary/10 outline-none"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                      autoFocus
                    />
                  ) : (
                    <span className="font-medium text-gray-900">{category.name}</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {editingId === category.id ? (
                      <>
                        <button
                          onClick={handleSaveEdit}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all"
                          title="Guardar"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Cancelar"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleStartEdit(category)}
                          className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                          title="Editar"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`¿Estás seguro de eliminar la categoría "${category.name}"? Los productos asociados podrían quedar sin categoría.`)) {
                              onDelete(category.id);
                            }
                          }}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={2} className="px-6 py-12 text-center text-gray-500 italic">
                  No hay categorías configuradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
