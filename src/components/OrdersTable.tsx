"use client";

import { useState } from "react";
import { PRODUCT_LABELS, type ProductType } from "@/config/stages";

type EnrichedOrder = {
  id: string;
  tracking_code: string;
  created_at: string;
  customer_name: string;
  product_type: ProductType;
  model: string;
  seller: string;
  inserted_at: string;
  stageNumber: number;
  stageLabel: string;
};

interface Props {
  orders: EnrichedOrder[];
}

export default function OrdersTable({ orders }: Props) {
  const [search, setSearch] = useState("");
  const [filterProduct, setFilterProduct] = useState("");
  const [filterSeller, setFilterSeller] = useState("");
  const [filterStage, setFilterStage] = useState("");

  const sellers = [...new Set(orders.map((o) => o.seller))].sort();
  const stages = [...new Set(orders.map((o) => o.stageLabel))].sort();

  const filtered = orders.filter((o) => {
    const matchSearch =
      !search ||
      o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      o.tracking_code.toLowerCase().includes(search.toLowerCase());
    const matchProduct = !filterProduct || o.product_type === filterProduct;
    const matchSeller = !filterSeller || o.seller === filterSeller;
    const matchStage = !filterStage || o.stageLabel === filterStage;
    return matchSearch && matchProduct && matchSeller && matchStage;
  });

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <input
          placeholder="Buscar cliente o código..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500 col-span-2 sm:col-span-1"
        />

        <select
          value={filterProduct}
          onChange={(e) => setFilterProduct(e.target.value)}
          className="bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Todos los productos</option>
          <option value="motorcycle">{PRODUCT_LABELS.motorcycle}</option>
          <option value="solar_kit">{PRODUCT_LABELS.solar_kit}</option>
          <option value="electric_tricycle">{PRODUCT_LABELS.electric_tricycle}</option>
        </select>

        <select
          value={filterSeller}
          onChange={(e) => setFilterSeller(e.target.value)}
          className="bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Todos los vendedores</option>
          {sellers.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select
          value={filterStage}
          onChange={(e) => setFilterStage(e.target.value)}
          className="bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Todos los estados</option>
          {stages.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Tabla */}
      {filtered.length === 0 ? (
        <p className="text-slate-500 text-sm text-center py-8">
          No hay pedidos que coincidan con los filtros.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 text-xs uppercase tracking-widest">
                <th className="text-left px-4 py-3">Fecha</th>
                <th className="text-left px-4 py-3">Cliente</th>
                <th className="text-left px-4 py-3">Producto</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Vendedor</th>
                <th className="text-left px-4 py-3">Estado</th>
                <th className="text-left px-4 py-3">Código</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order, i) => (
                <tr
                  key={order.id}
                  className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                    i % 2 === 0 ? "bg-white/[0.02]" : ""
                  }`}
                >
                  <td className="px-4 py-3 text-slate-300 whitespace-nowrap">
                    {new Date(order.created_at + "T00:00:00").toLocaleDateString(
                      "es-ES",
                      { day: "2-digit", month: "2-digit", year: "numeric" }
                    )}
                  </td>
                  <td className="px-4 py-3 text-white font-medium">
                    {order.customer_name}
                  </td>
                  <td className="px-4 py-3 text-slate-300">
                    <span>{PRODUCT_LABELS[order.product_type]}</span>
                    <span className="text-slate-500 block text-xs">{order.model}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-300 hidden md:table-cell">
                    {order.seller}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium
                        ${order.stageNumber === 8
                          ? "bg-green-500/20 text-green-400"
                          : "bg-orange-500/20 text-orange-400"
                        }`}
                    >
                      {order.stageLabel}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={`/${order.tracking_code}`}
                      target="_blank"
                      className="text-orange-400 font-mono text-xs hover:underline"
                    >
                      {order.tracking_code}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-slate-600 text-xs text-right">
        Mostrando {filtered.length} de {orders.length} pedidos
      </p>
    </div>
  );
}
