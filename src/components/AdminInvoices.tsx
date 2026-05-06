import { FileText, Calendar, DollarSign, ChevronRight, Package, User, CheckCircle, XCircle, Clock } from "lucide-react";
import { Invoice } from "@/types";
import { cn } from "@/lib/utils";

interface AdminInvoicesProps {
  invoices: Invoice[];
  onUpdateStatus: (id: string, status: Invoice["status"]) => void;
}

export default function AdminInvoices({ invoices, onUpdateStatus }: AdminInvoicesProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-primary">Gestión de Pedidos</h3>
        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Pendientes: {invoices.filter(i => i.status === 'pending').length}</span>
          <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Completados: {invoices.filter(i => i.status === 'completed').length}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Pedido</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Cliente</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Fecha</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Total</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Estado</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/5 text-primary rounded-lg">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">#{invoice.id.slice(-6).toUpperCase()}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">{invoice.items.length} items</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <User className="h-4 w-4 text-gray-400" />
                      {invoice.userId.slice(0, 8)}...
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(invoice.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-amber-500">
                    ${invoice.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                      invoice.status === 'completed' ? "bg-green-100 text-green-700" :
                      invoice.status === 'pending' ? "bg-yellow-100 text-yellow-700" :
                      "bg-red-100 text-red-700"
                    )}>
                      {invoice.status === 'completed' ? 'Completado' : 
                       invoice.status === 'pending' ? 'Pendiente' : 'Cancelado'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {invoice.status === 'pending' && (
                        <>
                          <button
                            onClick={() => onUpdateStatus(invoice.id, 'completed')}
                            className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-all"
                            title="Completar"
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => onUpdateStatus(invoice.id, 'cancelled')}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            title="Cancelar"
                          >
                            <XCircle className="h-5 w-5" />
                          </button>
                        </>
                      )}
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
