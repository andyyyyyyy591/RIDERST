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
        <div className="max-w-2xl mx-auto px-6 py-5">
          <span className="text-xl font-black text-gray-900 tracking-tight">
            tracking<span className="text-orange-500">rt</span>
          </span>
        </div>
      </header>

      {/* Contenido central */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          {/* Badge en vivo */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
              </span>
              <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
                Actualización automática
              </span>
            </div>
          </div>

          <h1 className="text-3xl font-black text-gray-900 text-center mb-2">
            Rastreá tu envío
          </h1>
          <p className="text-gray-400 text-center text-sm mb-8">
            Ingresá el código de seguimiento que recibiste
          </p>

          <form onSubmit={handleSearch} className="space-y-3">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="TDC-0000000000"
              className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 bg-gray-50 text-gray-900 placeholder-gray-300 text-center font-mono text-lg tracking-widest focus:outline-none focus:border-orange-400 focus:bg-white transition-all"
            />
            <button
              type="submit"
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-2xl transition-colors text-sm tracking-wide"
            >
              Rastrear pedido
            </button>
          </form>
        </div>
      </div>

      <footer className="text-center py-6 text-gray-300 text-xs">
        trackingrt.com
      </footer>
    </main>
  );
}
