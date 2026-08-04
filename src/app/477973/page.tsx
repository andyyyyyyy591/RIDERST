import { supabase } from "@/lib/supabase";
import { getCurrentState, TIMELINE_PHASES, PRODUCT_LABELS, type ProductType } from "@/config/stages";
import NewOrderForm from "@/components/NewOrderForm";
import OrdersTable from "@/components/OrdersTable";

export const revalidate = 0;

export default async function AdminPage() {
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .order("inserted_at", { ascending: false });

  const enriched = (orders ?? []).map((order) => {
    const state = getCurrentState(order.product_type as ProductType, order.created_at);
    const phaseLabel = TIMELINE_PHASES.find((p) => p.key === state.phase)?.label ?? "—";
    return { ...order, phaseLabel, stateTitulo: state.titulo };
  });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="text-2xl font-black text-gray-900 tracking-tight">
            tracking<span className="text-blue-500">rt</span>
            <span className="text-gray-400 font-normal text-base ml-2">— Panel Admin</span>
          </span>
          <a href="/" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
            ← Ver tracking público
          </a>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-1">Total pedidos</p>
            <p className="text-3xl font-black text-gray-900">{enriched.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-1">En tránsito</p>
            <p className="text-3xl font-black text-blue-500">
              {enriched.filter((o) => o.phaseLabel !== "Entregado" && o.phaseLabel !== "Coordinando entrega").length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-1">Coordinando entrega</p>
            <p className="text-3xl font-black text-green-500">
              {enriched.filter((o) => o.phaseLabel === "Coordinando entrega").length}
            </p>
          </div>
        </div>

        {/* Formulario */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 mb-5">Cargar nuevo pedido</h2>
          <NewOrderForm />
        </section>

        {/* Tabla */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 mb-5">Listado de pedidos</h2>
          <OrdersTable orders={enriched} />
        </section>
      </div>
    </main>
  );
}
