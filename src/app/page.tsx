"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [code, setCode] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const clean = code.trim().toUpperCase();
    if (clean) router.push(`/${clean}`);
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <span className="text-2xl font-black text-gray-900 tracking-tight">
            tracking<span className="text-orange-500">rt</span>
          </span>
        </div>
      </header>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-4 py-1.5 mb-5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
                Seguimiento en tiempo real
              </span>
            </div>

            <h1 className="text-4xl font-black text-gray-900 mb-3">
              Rastreá tu envío
            </h1>
            <p className="text-gray-500">
              Ingresá tu código de seguimiento para ver el estado de tu pedido.
            </p>
          </div>

          <form onSubmit={handleSearch} className="space-y-3">
            <div className="relative">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="TDC-0000000000"
                className="w-full px-4 py-4 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-300 text-center font-mono text-lg tracking-widest shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-4 rounded-xl transition-colors shadow-sm text-base"
            >
              Rastrear pedido →
            </button>
          </form>

          <p className="text-center mt-8 text-gray-400 text-sm">
            ¿Sos del equipo?{" "}
            <a href="/admin" className="text-gray-500 underline hover:text-gray-700">
              Panel admin
            </a>
          </p>
        </div>
      </div>

      <footer className="text-center py-4 text-gray-300 text-xs">
        trackingrt.com
      </footer>
    </main>
  );
}
