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
    <main className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-black text-gray-900 tracking-tight">
            tracking<span className="text-orange-500">rt</span>
          </span>
          <span className="text-xs text-gray-400 hidden sm:block">
            Servicio internacional de seguimiento de envíos
          </span>
        </div>
      </header>

      {/* Hero */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-gray-900 mb-3">
              Rastreá tu envío
            </h1>
            <p className="text-gray-400 text-sm">
              Ingresá tu número de seguimiento para consultar el estado de tu pedido.
            </p>
          </div>

          <form onSubmit={handleSearch} className="space-y-3">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="TDC-0000000000"
              className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-300 text-center font-mono text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all shadow-sm"
            />
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors text-sm tracking-wide shadow-sm"
            >
              Consultar estado
            </button>
          </form>

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-sm font-black text-gray-900 tracking-tight">
              tracking<span className="text-orange-500">rt</span>
            </span>
            <p className="text-xs text-gray-400 text-center">
              © {new Date().getFullYear()} TrackingRT. Todos los derechos reservados.
            </p>
            <div className="flex gap-4 text-xs text-gray-400">
              <span>Privacidad</span>
              <span>Términos</span>
              <span>Soporte</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
