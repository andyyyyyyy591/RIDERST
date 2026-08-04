import { supabase } from "@/lib/supabase";
import {
  getCurrentState,
  TIMELINE_PHASES,
  PRODUCT_LABELS,
  type ProductType,
} from "@/config/stages";
import TrackingTimeline from "@/components/TrackingTimeline";

interface Props {
  params: Promise<{ code: string }>;
}

export default async function TrackingPage({ params }: Props) {
  const { code } = await params;

  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("tracking_code", code.toUpperCase())
    .single();

  if (error || !order) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-5xl mb-4">—</p>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Código no encontrado
          </h1>
          <p className="text-gray-500 mb-6">
            Verificá el código e intentá nuevamente.
          </p>
          <a href="/" className="text-orange-500 font-semibold hover:text-orange-600">
            ← Volver al buscador
          </a>
        </div>
      </main>
    );
  }

  const productType = order.product_type as ProductType;
  const currentState = getCurrentState(productType, order.created_at);
  const isDelivered = currentState.phase === "entregado";

  // Índice de fase activa en el timeline (0-based)
  const activePhaseIndex = TIMELINE_PHASES.findIndex(
    (p) => p.key === currentState.phase
  );

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="text-2xl font-black text-gray-900 tracking-tight">
            tracking<span className="text-orange-500">rt</span>
          </span>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500" />
            </span>
            <span className="text-xs font-semibold text-orange-500 uppercase tracking-widest">
              En vivo
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-5">

        {/* Info del pedido */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-1">Cliente</p>
              <p className="text-xl font-bold text-gray-900">{order.customer_name}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-1">Código</p>
              <p className="text-sm font-mono font-bold text-orange-500">{order.tracking_code}</p>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-1">Producto</p>
            <p className="text-gray-800 font-semibold">
              {PRODUCT_LABELS[productType]}
              <span className="text-gray-400 font-normal"> — {order.model}</span>
            </p>
          </div>
        </div>

        {/* Estado actual */}
        <div className={`rounded-2xl p-5 border ${
          isDelivered ? "bg-green-50 border-green-200" : "bg-orange-50 border-orange-200"
        }`}>
          <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${
            isDelivered ? "text-green-600" : "text-orange-600"
          }`}>
            Estado actual
          </p>
          <p className="text-gray-900 font-bold text-lg leading-tight">
            {currentState.titulo}
          </p>
          <p className="text-gray-600 text-sm mt-1">{currentState.texto}</p>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
            Seguimiento del envío
          </h2>
          <TrackingTimeline
            phases={TIMELINE_PHASES}
            activePhaseIndex={activePhaseIndex}
          />
        </div>

        <p className="text-center text-gray-400 text-xs pb-6">
          trackingrt.com · Actualización automática diaria
        </p>
      </div>
    </main>
  );
}
