import { User, Mail, Calendar, Shield, Trash2, Edit2, Search } from "lucide-react";
import { UserProfile } from "@/types";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AdminUsersProps {
  users: UserProfile[];
  onUpdateRole: (uid: string, role: "user" | "admin") => void;
  onDelete: (uid: string) => void;
}

export default function AdminUsers({ users, onUpdateRole, onDelete }: AdminUsersProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.displayName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-[#003366]">Gestión de Usuarios</h3>
        <div className="relative max-w-xs w-full">
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-[#003366] outline-none text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Usuario</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Rol</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Registro</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map((user) => (
                <tr key={user.uid} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-[#003366] font-bold">
                        {user.displayName?.[0] || user.email[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">{user.displayName || "Sin nombre"}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                      user.role === 'admin' ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                    )}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onUpdateRole(user.uid, user.role === 'admin' ? 'user' : 'admin')}
                        className="p-2 text-gray-400 hover:text-[#003366] transition-colors"
                        title="Cambiar Rol"
                      >
                        <Shield className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDelete(user.uid)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        title="Eliminar Usuario"
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
