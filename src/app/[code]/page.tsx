import { supabase } from "@/lib/supabase";
import {
  getCurrentStage,
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
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Código no encontrado
          </h1>
          <p className="text-gray-500 mb-6">
            Verificá el código e intentá nuevamente.
          </p>
          <a
            href="/"
            className="text-orange-500 font-semibold hover:text-orange-600"
          >
            ← Volver al buscador
          </a>
        </div>
      </main>
    );
  }

  const productType = order.product_type as ProductType;
  const { stageNumber, daysElapsed } = getCurrentStage(productType, order.created_at);
  const currentStage = PUBLIC_STAGES.find((s) => s.id === stageNumber)!;
  const isDelivered = stageNumber === 8;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-gray-900 tracking-tight">
              tracking<span className="text-orange-500">rt</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
            </span>
            <span className="text-xs font-semibold text-orange-500 uppercase tracking-widest">
              En vivo
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-5">

        {/* Card info del pedido */}
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

        {/* Estado actual destacado */}
        <div className={`rounded-2xl p-5 border ${
          isDelivered
            ? "bg-green-50 border-green-200"
            : "bg-orange-50 border-orange-200"
        }`}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{currentStage.icon}</span>
            <div>
              <p className={`text-xs font-semibold uppercase tracking-widest mb-0.5 ${
                isDelivered ? "text-green-600" : "text-orange-600"
              }`}>
                Estado actual · Día {daysElapsed}
              </p>
              <p className="text-gray-900 font-bold text-lg leading-tight">{currentStage.label}</p>
              <p className="text-gray-600 text-sm mt-1">{currentStage.description}</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">
            Seguimiento del envío
          </h2>
          <TrackingTimeline stages={PUBLIC_STAGES} currentStage={stageNumber} />
        </div>

        <p className="text-center text-gray-400 text-xs pb-6">
          trackingrt.com · Actualización automática diaria
        </p>
      </div>
    </main>
  );
}
