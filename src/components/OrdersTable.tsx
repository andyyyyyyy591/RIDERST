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
  phaseLabel: string;
  stateTitulo: string;
};

interface Props {
  orders: EnrichedOrder[];
}

const selectClass = "bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400";

export default function OrdersTable({ orders }: Props) {
  const [search, setSearch] = useState("");
  const [filterProduct, setFilterProduct] = useState("");
  const [filterSeller, setFilterSeller] = useState("");
  const [filterPhase, setFilterPhase] = useState("");

  const sellers = [...new Set(orders.map((o) => o.seller))].sort();
  const phases = [...new Set(orders.map((o) => o.phaseLabel))].sort();

  const filtered = orders.filter((o) => {
    const matchSearch =
      !search ||
      o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      o.tracking_code.toLowerCase().includes(search.toLowerCase());
    const matchProduct = !filterProduct || o.product_type === filterProduct;
    const matchSeller = !filterSeller || o.seller === filterSeller;
    const matchPhase = !filterPhase || o.phaseLabel === filterPhase;
    return matchSearch && matchProduct && matchSeller && matchPhase;
  });

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <input
          placeholder="Buscar cliente o código..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 col-span-2 sm:col-span-1"
        />
        <select value={filterProduct} onChange={(e) => setFilterProduct(e.target.value)} className={selectClass}>
          <option value="">Todos los productos</option>
          <option value="motorcycle">{PRODUCT_LABELS.motorcycle}</option>
          <option value="solar_kit">{PRODUCT_LABELS.solar_kit}</option>
          <option value="electric_tricycle">{PRODUCT_LABELS.electric_tricycle}</option>
        </select>
        <select value={filterSeller} onChange={(e) => setFilterSeller(e.target.value)} className={selectClass}>
          <option value="">Todos los vendedores</option>
          {sellers.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={filterPhase} onChange={(e) => setFilterPhase(e.target.value)} className={selectClass}>
          <option value="">Todos los estados</option>
          {phases.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      {/* Tabla */}
      {filtered.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-10">
          No hay pedidos que coincidan con los filtros.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 text-xs uppercase tracking-widest bg-gray-50">
                <th className="text-left px-4 py-3 font-medium">Fecha</th>
                <th className="text-left px-4 py-3 font-medium">Cliente</th>
                <th className="text-left px-4 py-3 font-medium">Producto</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Vendedor</th>
                <th className="text-left px-4 py-3 font-medium">Estado</th>
                <th className="text-left px-4 py-3 font-medium">Código</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order, i) => (
                <tr
                  key={order.id}
                  className={`border-b border-gray-50 hover:bg-orange-50/50 transition-colors ${i % 2 === 0 ? "" : "bg-gray-50/50"}`}
                >
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                    {new Date(order.created_at + "T00:00:00").toLocaleDateString("es-ES", {
                      day: "2-digit", month: "2-digit", year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3 text-gray-900 font-semibold">{order.customer_name}</td>
                  <td className="px-4 py-3 text-gray-700">
                    <span>{PRODUCT_LABELS[order.product_type]}</span>
                    <span className="text-gray-400 block text-xs">{order.model}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{order.seller}</td>
                  <td className="px-4 py-3">
                    <span className="block text-xs font-semibold text-orange-500">{order.phaseLabel}</span>
                    <span className="block text-xs text-gray-400 mt-0.5">{order.stateTitulo}</span>
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={`/${order.tracking_code}`}
                      target="_blank"
                      className="text-orange-500 font-mono text-xs hover:underline"
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

      <p className="text-gray-400 text-xs text-right">
        Mostrando {filtered.length} de {orders.length} pedidos
      </p>
    </div>
  );
}
