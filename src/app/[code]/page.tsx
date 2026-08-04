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
      <main className="min-h-screen bg-white flex items-center justify-center px-5">
        <div className="text-center">
          <p className="text-gray-200 text-7xl font-black mb-3">404</p>
          <h1 className="text-lg font-bold text-gray-800 mb-2">Código no encontrado</h1>
          <p className="text-gray-400 text-sm mb-5">Verificá el código e intentá nuevamente.</p>
          <a href="/" className="text-sky-500 font-semibold text-sm hover:text-sky-600">
            ← Volver al buscador
          </a>
        </div>
      </main>
    );
  }

  const productType = order.product_type as ProductType;
  const currentState = getCurrentState(productType, order.created_at);
  const activePhaseIndex = TIMELINE_PHASES.findIndex((p) => p.key === currentState.phase);

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-xl mx-auto px-5 py-4 flex items-center justify-between">
          <a href="/" className="text-lg font-black text-gray-900">
            tracking<span className="text-sky-500">rt</span>
          </a>
          <span className="text-xs text-gray-400 hidden sm:block">
            Seguimiento internacional de envíos
          </span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-5 space-y-3">

        {/* Info pedido */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Cliente</p>
              <p className="text-lg font-black text-gray-900">{order.customer_name}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">N° seguimiento</p>
              <p className="text-xs font-mono font-bold text-sky-500 bg-sky-50 px-2 py-1 rounded-lg">
                {order.tracking_code}
              </p>
            </div>
          </div>
          <div className="border-t border-gray-50 pt-3">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Producto</p>
            <p className="text-sm text-gray-700 font-semibold">
              {PRODUCT_LABELS[productType]}
              <span className="text-gray-400 font-normal"> · {order.model}</span>
            </p>
          </div>
        </div>

        {/* Estado actual */}
        <div className="bg-sky-500 rounded-2xl p-5 text-white">
          <p className="text-sky-200 text-xs font-semibold uppercase tracking-wider mb-1">
            Estado actual
          </p>
          <p className="text-white font-black text-lg leading-tight mb-1">
            {currentState.titulo}
          </p>
          <p className="text-sky-100 text-sm leading-relaxed">
            {currentState.texto}
          </p>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-5">
            Historial del envío
          </p>
          <TrackingTimeline phases={TIMELINE_PHASES} activePhaseIndex={activePhaseIndex} />
        </div>

        <div className="border-t border-gray-100 pt-5 pb-2">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
            <span className="font-black text-gray-900 text-sm">
              tracking<span className="text-sky-500">rt</span>
            </span>
            <span>© {new Date().getFullYear()} TrackingRT. Todos los derechos reservados.</span>
            <div className="flex gap-4">
              <span>Privacidad</span>
              <span>Términos</span>
              <span>Soporte</span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
