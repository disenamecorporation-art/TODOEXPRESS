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
  const [searchQuery, setSearchQuery] = useState("");
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    description: "",
    price: 0,
    image: "",
    category: "Medicamentos",
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
        category: "Medicamentos",
        stock: 0,
      });
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-[#003366]">Gestión de Inventario</h3>
        <div className="flex items-center gap-4">
          <div className="relative max-w-xs w-full hidden md:block">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-[#003366] outline-none text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-2 bg-[#003366] text-white px-4 py-2 rounded-lg hover:bg-[#004080] transition-all"
          >
            {isAdding ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {isAdding ? "Cancelar" : "Nuevo Producto"}
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Nombre del Producto</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ej. Acetaminofén 500mg"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-[#003366] outline-none"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
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
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-[#003366] outline-none"
                  value={newProduct.price || ""}
                  onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                />
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Categoría</label>
              <div className="relative">
                <select
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-[#003366] outline-none appearance-none bg-white"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                >
                  <option value="Medicamentos">Medicamentos</option>
                  <option value="Cuidado Personal">Cuidado Personal</option>
                  <option value="Belleza">Belleza</option>
                  <option value="Hogar">Hogar</option>
                  <option value="Bebés">Bebés</option>
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
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-[#003366] outline-none"
                  value={newProduct.stock || ""}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
                />
                <Database className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">URL de Imagen</label>
              <input
                type="text"
                placeholder="https://ejemplo.com/producto.jpg"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-[#003366] outline-none"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              />
            </div>
            <div className="md:col-span-3 space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Descripción</label>
              <textarea
                placeholder="Detalles del producto..."
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-[#003366] outline-none min-h-[100px]"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
            </div>
          </div>
          <button
            onClick={handleAdd}
            disabled={!newProduct.name || newProduct.price <= 0}
            className="w-full bg-[#003366] text-white py-3 rounded-lg font-bold hover:bg-[#004080] transition-all disabled:opacity-50 shadow-md"
          >
            Guardar Producto
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
                  <td className="px-6 py-4 text-sm font-bold text-[#003366]">
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
