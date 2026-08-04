import { supabase } from "@/lib/supabase";
import { getCurrentStage, PRODUCT_LABELS, PUBLIC_STAGES, type ProductType } from "@/config/stages";
import NewOrderForm from "@/components/NewOrderForm";
import OrdersTable from "@/components/OrdersTable";

export const revalidate = 0; // Sin caché — siempre fresco

export default async function AdminPage() {
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .order("inserted_at", { ascending: false });

  const enriched = (orders ?? []).map((order) => {
    const { stageNumber } = getCurrentStage(
      order.product_type as ProductType,
      order.created_at
    );
    const stageLabel =
      PUBLIC_STAGES.find((s) => s.id === stageNumber)?.label ?? "—";
    return { ...order, stageNumber, stageLabel };
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              tracking<span className="text-orange-400">rt</span>{" "}
              <span className="text-slate-400 font-normal">— Panel Admin</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {enriched.length} pedido{enriched.length !== 1 ? "s" : ""} cargado
              {enriched.length !== 1 ? "s" : ""}
            </p>
          </div>
          <a
            href="/"
            className="text-slate-400 text-sm hover:text-white transition-colors"
          >
            ← Ver tracking público
          </a>
        </div>

        {/* Formulario nuevo pedido */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-5">Cargar nuevo pedido</h2>
          <NewOrderForm />
        </section>

        {/* Tabla de pedidos */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Listado de pedidos</h2>
          <OrdersTable orders={enriched} />
        </section>
      </div>
    </main>
  );
}
