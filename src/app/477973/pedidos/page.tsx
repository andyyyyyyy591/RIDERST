import { supabase } from "@/lib/supabase";
import { getCurrentState, TIMELINE_PHASES, PRODUCT_LABELS, type ProductType } from "@/config/stages";
import OrdersTable from "@/components/OrdersTable";

export const revalidate = 0;

export default async function AdminOrdersPage() {
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
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">Pedidos</h1>
          <p className="text-sm text-gray-400 mt-0.5">{enriched.length} pedido{enriched.length !== 1 ? "s" : ""} en total</p>
        </div>

        {/* Stats rápidas */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-gray-400">En tránsito</p>
            <p className="text-lg font-black text-blue-700">
              {enriched.filter((o) => o.phaseLabel !== "Coordinando entrega").length}
            </p>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="text-right">
            <p className="text-xs text-gray-400">Coordinando entrega</p>
            <p className="text-lg font-black text-green-600">
              {enriched.filter((o) => o.phaseLabel === "Coordinando entrega").length}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100">
        <OrdersTable orders={enriched} />
      </div>
    </div>
  );
}
