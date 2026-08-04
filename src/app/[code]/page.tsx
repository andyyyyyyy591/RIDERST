import { supabase } from "@/lib/supabase";
import {
  getCurrentStage,
  getEstimatedDelivery,
  PUBLIC_STAGES,
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
      <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">
            Código no encontrado
          </h1>
          <p className="text-slate-400 mb-6">
            Verificá el código e intentá nuevamente.
          </p>
          <a
            href="/"
            className="text-orange-400 underline hover:text-orange-300"
          >
            Volver al buscador
          </a>
        </div>
      </main>
    );
  }

  const productType = order.product_type as ProductType;
  const { stageNumber, daysElapsed } = getCurrentStage(
    productType,
    order.created_at
  );
  const estimatedDelivery = getEstimatedDelivery(productType, order.created_at);
  const currentStage = PUBLIC_STAGES.find((s) => s.id === stageNumber)!;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 px-4 py-10">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">
            Rider<span className="text-orange-400">Track</span>
          </h1>
        </div>

        {/* Card principal */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-widest">
                Cliente
              </p>
              <p className="text-white font-semibold text-lg">
                {order.customer_name}
              </p>
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-xs uppercase tracking-widest">
                Código
              </p>
              <p className="text-orange-400 font-mono font-semibold">
                {order.tracking_code}
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4 flex justify-between text-sm">
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">
                Producto
              </p>
              <p className="text-white">
                {PRODUCT_LABELS[productType]} — {order.model}
              </p>
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">
                Entrega estimada
              </p>
              <p className="text-white">{estimatedDelivery}</p>
            </div>
          </div>

          {/* Estado actual destacado */}
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl px-4 py-3">
            <p className="text-orange-400 text-xs uppercase tracking-widest mb-1">
              Estado actual
            </p>
            <p className="text-white font-semibold">{currentStage.label}</p>
            <p className="text-slate-400 text-xs mt-1">
              Día {daysElapsed} de tu envío
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4">
            Seguimiento del envío
          </h2>
          <TrackingTimeline
            stages={PUBLIC_STAGES}
            currentStage={stageNumber}
          />
        </div>

        <p className="text-center text-slate-600 text-xs">
          trackingrt.com · Actualización automática diaria
        </p>
      </div>
    </main>
  );
}
