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
    <main className="h-screen overflow-hidden bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 flex-shrink-0">
        <div className="max-w-2xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-800 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 .001M13 16l2-7h4l2 7M13 16H9" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-black text-gray-900 leading-none">
                tracking<span className="text-blue-700">rt</span>
              </p>
              <p className="text-xs text-gray-400 leading-none mt-0.5 uppercase tracking-widest">
                Seguimiento de envíos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-gray-600 font-medium">En línea</span>
          </div>
        </div>
      </header>

      {/* Contenido central */}
      <div className="flex-1 flex flex-col items-center justify-center px-5">
        <div className="w-full max-w-sm text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 border border-gray-200 bg-white rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-700" />
            <span className="text-xs text-gray-600 font-medium">Rastreo en tiempo real</span>
          </div>

          <h1 className="text-4xl font-black text-gray-900 mb-3 leading-tight">
            Rastreá tu envío
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            Ingresá tu código de seguimiento para ver el<br className="hidden sm:block" /> estado actual de tu pedido.
          </p>

          {/* Input + Botón */}
          <form onSubmit={handleSearch}>
            <div className="flex items-center bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="pl-4 pr-2 text-gray-400 flex-shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="TDC-0000000000"
                autoCapitalize="characters"
                className="flex-1 py-3.5 px-2 text-gray-900 placeholder-gray-300 font-mono text-sm tracking-widest focus:outline-none bg-transparent min-w-0"
              />
              <button
                type="submit"
                className="bg-blue-800 hover:bg-blue-700 text-white font-semibold px-5 py-3.5 text-sm transition-colors flex-shrink-0"
              >
                Buscar
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Ejemplo: <span className="font-bold text-gray-500">TDC-8172628101</span>
            </p>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex-shrink-0 py-4 text-center">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} TrackingRT · Todos los derechos reservados
        </p>
      </footer>
    </main>
  );
}
