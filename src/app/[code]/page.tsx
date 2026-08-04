import { supabase } from "@/lib/supabase";
import {
  getCurrentState,
  TIMELINE_PHASES,
  PRODUCT_LABELS,
  PRODUCT_TOTAL_DAYS,
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
      <main className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-200 text-8xl font-black mb-4">404</p>
          <h1 className="text-xl font-bold text-gray-800 mb-2">Código no encontrado</h1>
          <p className="text-gray-400 text-sm mb-6">Verificá el código e intentá nuevamente.</p>
          <a href="/" className="text-orange-500 font-semibold hover:text-orange-600 text-sm">
            ← Volver al buscador
          </a>
        </div>
      </main>
    );
  }

  const productType = order.product_type as ProductType;
  const currentState = getCurrentState(productType, order.created_at);
  const activePhaseIndex = TIMELINE_PHASES.findIndex((p) => p.key === currentState.phase);
  const totalPhases = TIMELINE_PHASES.length;
  const progressPct = Math.round((activePhaseIndex / (totalPhases - 1)) * 100);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-black text-gray-900 tracking-tight">
            tracking<span className="text-orange-500">rt</span>
          </a>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
            </span>
            <span className="text-xs font-semibold text-orange-500 uppercase tracking-widest">En vivo</span>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">

        {/* Card principal — info + barra de progreso */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Barra de progreso superior */}
          <div className="h-1 bg-gray-100">
            <div
              className="h-full bg-orange-500 transition-all duration-700"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <div className="p-6">
            {/* Cliente / Código */}
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-0.5">Cliente</p>
                <p className="text-xl font-black text-gray-900">{order.customer_name}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-0.5">N° de seguimiento</p>
                <p className="text-sm font-mono font-bold text-orange-500 bg-orange-50 px-2.5 py-1 rounded-lg">
                  {order.tracking_code}
                </p>
              </div>
            </div>

            {/* Separador */}
            <div className="border-t border-gray-50 pt-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-0.5">Producto</p>
                <p className="text-gray-800 font-semibold text-sm">
                  {PRODUCT_LABELS[productType]}
                  <span className="text-gray-400 font-normal"> · {order.model}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-0.5">Progreso</p>
                <p className="text-gray-700 font-bold text-sm">{progressPct}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Estado actual */}
        <div className="bg-orange-500 rounded-2xl p-5 text-white">
          <p className="text-orange-200 text-xs font-semibold uppercase tracking-widest mb-1">
            Estado actual
          </p>
          <p className="text-white font-black text-xl leading-tight mb-1">
            {currentState.titulo}
          </p>
          <p className="text-orange-100 text-sm leading-relaxed">
            {currentState.texto}
          </p>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-6">
            Historial del envío
          </p>
          <TrackingTimeline phases={TIMELINE_PHASES} activePhaseIndex={activePhaseIndex} />
        </div>

        <p className="text-center text-gray-300 text-xs pb-4">
          trackingrt.com
        </p>
      </div>
    </main>
  );
}
