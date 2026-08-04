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

  const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent";
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
            className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 text-white font-bold py-2.5 rounded-lg transition-colors text-sm"
          >
            {loading ? "Guardando..." : "Crear pedido"}
          </button>
        </div>
      </form>

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-2">
          <p className="text-green-700 font-semibold text-sm">Pedido creado exitosamente</p>
          <p className="text-gray-900 font-mono text-lg font-bold">{success.code}</p>
          <div className="flex items-center gap-2">
            <input readOnly value={success.link} className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-600 text-sm font-mono" />
            <button
              onClick={() => navigator.clipboard.writeText(success.link)}
              className="bg-gray-900 hover:bg-gray-700 text-white text-sm px-3 py-2 rounded-lg transition-colors font-medium"
            >
              Copiar
            </button>
          </div>
          <p className="text-gray-500 text-xs">Enviá este link al cliente para que consulte su pedido.</p>
        </div>
      )}
    </div>
  );
}
