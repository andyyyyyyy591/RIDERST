"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { generateTrackingCode } from "@/lib/tracking-code";
import { PRODUCT_LABELS, type ProductType } from "@/config/stages";
import { useRouter } from "next/navigation";

const PRODUCT_OPTIONS: { value: ProductType; label: string }[] = [
  { value: "motorcycle", label: PRODUCT_LABELS.motorcycle },
  { value: "solar_kit", label: PRODUCT_LABELS.solar_kit },
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

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
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

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Fecha */}
        <div>
          <label className="block text-xs text-slate-400 mb-1 uppercase tracking-widest">
            Fecha (día 0)
          </label>
          <input
            type="date"
            name="created_at"
            required
            value={form.created_at}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Nombre del cliente */}
        <div>
          <label className="block text-xs text-slate-400 mb-1 uppercase tracking-widest">
            Nombre del cliente
          </label>
          <input
            type="text"
            name="customer_name"
            required
            placeholder="Ej: Juan García"
            value={form.customer_name}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Tipo de producto */}
        <div>
          <label className="block text-xs text-slate-400 mb-1 uppercase tracking-widest">
            Tipo de producto
          </label>
          <select
            name="product_type"
            value={form.product_type}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {PRODUCT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Modelo */}
        <div>
          <label className="block text-xs text-slate-400 mb-1 uppercase tracking-widest">
            Modelo
          </label>
          <input
            type="text"
            name="model"
            required
            placeholder="Ej: Honda CB300R"
            value={form.model}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Vendedor */}
        <div>
          <label className="block text-xs text-slate-400 mb-1 uppercase tracking-widest">
            Vendedor
          </label>
          <input
            type="text"
            name="seller"
            required
            placeholder="Ej: Carlos López"
            value={form.seller}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Botón */}
        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-400 disabled:bg-orange-800 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
          >
            {loading ? "Guardando..." : "Crear pedido"}
          </button>
        </div>
      </form>

      {/* Resultado exitoso */}
      {success && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 space-y-2">
          <p className="text-green-400 font-semibold text-sm">
            ✓ Pedido creado exitosamente
          </p>
          <p className="text-white font-mono text-lg">{success.code}</p>
          <div className="flex items-center gap-2">
            <input
              readOnly
              value={success.link}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-slate-300 text-sm font-mono"
            />
            <button
              onClick={() => navigator.clipboard.writeText(success.link)}
              className="bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-2 rounded-lg transition-colors"
            >
              Copiar
            </button>
          </div>
          <p className="text-slate-400 text-xs">
            Enviale este link al cliente para que pueda rastrear su pedido.
          </p>
        </div>
      )}
    </div>
  );
}
