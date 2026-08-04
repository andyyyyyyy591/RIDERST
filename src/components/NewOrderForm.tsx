"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { generateTrackingCode } from "@/lib/tracking-code";
import { PRODUCT_LABELS, type ProductType } from "@/config/stages";
import { useRouter } from "next/navigation";

const PRODUCT_OPTIONS: { value: ProductType; label: string }[] = [
  { value: "motorcycle",        label: PRODUCT_LABELS.motorcycle },
  { value: "solar_kit",         label: PRODUCT_LABELS.solar_kit },
  { value: "electric_tricycle", label: PRODUCT_LABELS.electric_tricycle },
];

export default function NewOrderForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [success, setSuccess] = useState<{ code: string; link: string } | null>(null);
  const [form, setForm] = useState({
    created_at: new Date().toISOString().split("T")[0],
    customer_name: "",
    product_type: "motorcycle" as ProductType,
    model: "",
    seller: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    const tracking_code = generateTrackingCode();
    const { error } = await supabase.from("orders").insert({
      tracking_code,
      created_at: form.created_at,
      customer_name: form.customer_name,
      product_type: form.product_type,
      model: form.model,
      seller: form.seller,
    });

    setLoading(false);

    if (error) {
      alert("Error al guardar: " + error.message);
      return;
    }

    const link = `${window.location.origin}/${tracking_code}`;
    setSuccess({ code: tracking_code, link });
    setForm({
      created_at: new Date().toISOString().split("T")[0],
      customer_name: "",
      product_type: "motorcycle",
      model: "",
      seller: "",
    });
    router.refresh();
  }

  async function handleCopy(link: string) {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // text-base (16px) en inputs para evitar zoom en iOS
  const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent";
  const labelClass = "block text-xs text-gray-500 mb-1.5 uppercase tracking-widest font-medium";

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Fecha (día 0)</label>
          <input type="date" name="created_at" required value={form.created_at} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Nombre del cliente</label>
          <input type="text" name="customer_name" required placeholder="Ej: Juan García" value={form.customer_name} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Tipo de producto</label>
          <select name="product_type" value={form.product_type} onChange={handleChange} className={inputClass}>
            {PRODUCT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Modelo</label>
          <input type="text" name="model" required placeholder="Ej: Honda CB300R" value={form.model} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Vendedor</label>
          <input type="text" name="seller" required placeholder="Ej: Carlos López" value={form.seller} onChange={handleChange} className={inputClass} />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-300 text-white font-bold py-2.5 rounded-lg transition-colors text-sm"
          >
            {loading ? "Guardando..." : "Crear pedido"}
          </button>
        </div>
      </form>

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-green-700 font-semibold text-sm">Pedido creado exitosamente</p>
          </div>

          <div className="bg-white rounded-lg px-3 py-2 border border-green-100">
            <p className="text-xs text-gray-400 mb-0.5">Código de seguimiento</p>
            <p className="text-gray-900 font-mono font-bold text-base">{success.code}</p>
          </div>

          <div className="flex items-center gap-2">
            <input
              readOnly
              value={success.link}
              className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-500 text-sm font-mono min-w-0"
            />
            <button
              onClick={() => handleCopy(success.link)}
              className={`flex-shrink-0 font-semibold text-sm px-4 py-2 rounded-lg transition-all ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-gray-900 hover:bg-gray-700 text-white"
              }`}
            >
              {copied ? "¡Copiado!" : "Copiar"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
