import { FileText, Calendar, DollarSign, ChevronRight, Package } from "lucide-react";
import { Invoice } from "@/types";
import { cn } from "@/lib/utils";

interface InvoiceListProps {
  invoices: Invoice[];
  onViewDetails: (invoice: Invoice) => void;
}

export default function InvoiceList({ invoices, onViewDetails }: InvoiceListProps) {
  if (invoices.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
        <FileText className="h-16 w-16 text-gray-200 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-700 mb-2">No tienes facturas aún</h3>
        <p className="text-gray-500">Tus compras aparecerán aquí una vez que realices tu primer pedido.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {invoices.map((invoice) => (
        <div
          key={invoice.id}
          onClick={() => onViewDetails(invoice)}
          className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-[#003366] rounded-xl group-hover:bg-[#003366] group-hover:text-white transition-colors">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800">Factura #{invoice.id.slice(-6).toUpperCase()}</h4>
              <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(invoice.date).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <Package className="h-3 w-3" />
                  {invoice.items.length} productos
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-8">
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Total</p>
              <p className="text-xl font-bold text-[#003366]">${invoice.total.toFixed(2)}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <span className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                invoice.status === 'completed' ? "bg-green-100 text-green-700" :
                invoice.status === 'pending' ? "bg-yellow-100 text-yellow-700" :
                "bg-red-100 text-red-700"
              )}>
                {invoice.status === 'completed' ? 'Completado' : 
                 invoice.status === 'pending' ? 'Pendiente' : 'Cancelado'}
              </span>
              <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-[#003366] group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
