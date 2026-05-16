import { useState } from "react";
import { Plus, Trash2, Edit2, Search, Package, DollarSign, Tag, Database, X, Check } from "lucide-react";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

interface AdminProductsProps {
  products: Product[];
  onAdd: (product: Omit<Product, "id">) => void;
  onUpdate: (id: string, updates: Partial<Product>) => void;
  onDelete: (id: string) => void;
}

export default function AdminProducts({ products, onAdd, onUpdate, onDelete }: AdminProductsProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    description: "",
    price: 0,
    image: "",
    category: "Relojes",
    stock: 0,
  });

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    if (newProduct.name && newProduct.price > 0) {
      onAdd(newProduct);
      setNewProduct({
        name: "",
        description: "",
        price: 0,
        image: "",
        category: "Relojes",
        stock: 0,
      });
      setIsAdding(false);
    }
  };

  const handleUpdate = () => {
    if (editingProduct) {
      onUpdate(editingProduct.id, editingProduct);
      setEditingProduct(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-primary">Gestión de Inventario</h3>
        <div className="flex items-center gap-4">
          <div className="relative max-w-xs w-full hidden md:block">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <button
            onClick={() => {
              setIsAdding(!isAdding);
              setEditingProduct(null);
            }}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-all font-bold"
          >
            {isAdding || editingProduct ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {isAdding || editingProduct ? "Cancelar" : "Nuevo Producto"}
          </button>
        </div>
      </div>

      {(isAdding || editingProduct) && (
        <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-bold text-primary">
              {editingProduct ? `Editando: ${editingProduct.name}` : "Añadir Nuevo Producto"}
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Nombre del Producto</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ej. Reloj Casio F-91W"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none"
                  value={editingProduct ? editingProduct.name : newProduct.name}
                  onChange={(e) => editingProduct 
                    ? setEditingProduct({ ...editingProduct, name: e.target.value })
                    : setNewProduct({ ...newProduct, name: e.target.value })
                  }
                />
                <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Precio ($)</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none"
                  value={editingProduct ? editingProduct.price : (newProduct.price || "")}
                  onChange={(e) => editingProduct
                    ? setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })
                    : setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })
                  }
                />
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Categoría</label>
              <div className="relative">
                <select
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none appearance-none bg-white"
                  value={editingProduct ? editingProduct.category : newProduct.category}
                  onChange={(e) => editingProduct
                    ? setEditingProduct({ ...editingProduct, category: e.target.value })
                    : setNewProduct({ ...newProduct, category: e.target.value })
                  }
                >
                  <option value="Relojes">Relojes</option>
                  <option value="Baterías">Baterías</option>
                  <option value="Accesorios">Accesorios</option>
                  <option value="Repuestos">Repuestos</option>
                </select>
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Stock Inicial</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none"
                  value={editingProduct ? editingProduct.stock : (newProduct.stock || "")}
                  onChange={(e) => editingProduct
                    ? setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) })
                    : setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })
                  }
                />
                <Database className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">URL de Imagen</label>
              <input
                type="text"
                placeholder="https://ejemplo.com/producto.jpg"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none"
                value={editingProduct ? editingProduct.image : newProduct.image}
                onChange={(e) => editingProduct
                  ? setEditingProduct({ ...editingProduct, image: e.target.value })
                  : setNewProduct({ ...newProduct, image: e.target.value })
                }
              />
            </div>
            <div className="md:col-span-3 space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Descripción</label>
              <textarea
                placeholder="Detalles del producto..."
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none min-h-[100px]"
                value={editingProduct ? editingProduct.description : newProduct.description}
                onChange={(e) => editingProduct
                  ? setEditingProduct({ ...editingProduct, description: e.target.value })
                  : setNewProduct({ ...newProduct, description: e.target.value })
                }
              />
            </div>
          </div>
          <button
            onClick={editingProduct ? handleUpdate : handleAdd}
            disabled={editingProduct ? !editingProduct.name || editingProduct.price <= 0 : !newProduct.name || newProduct.price <= 0}
            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition-all disabled:opacity-50 shadow-md"
          >
            {editingProduct ? "Actualizar Producto" : "Guardar Producto"}
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Producto</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Categoría</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Precio</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Stock</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg bg-gray-100 p-1 flex-shrink-0">
                        <img src={product.image} alt={product.name} className="h-full w-full object-contain mix-blend-multiply" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">{product.name}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">ID: {product.id.slice(-6)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-amber-500">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "text-xs font-bold",
                      product.stock < 10 ? "text-red-500" : "text-green-600"
                    )}>
                      {product.stock} unids.
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          setEditingProduct(product);
                          setIsAdding(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="p-2 text-gray-400 hover:text-primary transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDelete(product.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
