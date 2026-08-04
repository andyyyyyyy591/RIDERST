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
      <header className="border-b border-gray-100">
        <div className="max-w-xl mx-auto px-5 py-4 flex items-center justify-between">
          <span className="text-lg font-black text-gray-900">
            tracking<span className="text-sky-500">rt</span>
          </span>
          <span className="text-xs text-gray-400 hidden sm:block">
            Seguimiento internacional de envíos
          </span>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-5">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-black text-gray-900 text-center mb-1">
            Rastreá tu envío
          </h1>
          <p className="text-gray-400 text-sm text-center mb-8">
            Ingresá tu número de seguimiento
          </p>

          <form onSubmit={handleSearch} className="space-y-2">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="TDC-0000000000"
              autoCapitalize="characters"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-300 text-center font-mono text-base tracking-widest focus:outline-none focus:border-sky-400 transition-colors bg-gray-50"
            />
            <button
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white font-semibold py-3.5 rounded-xl transition-colors text-sm"
            >
              Consultar estado
            </button>
          </form>
        </div>
      </div>

      <footer className="border-t border-gray-100 py-5 px-5">
        <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span className="font-black text-gray-900 text-sm">
            tracking<span className="text-sky-500">rt</span>
          </span>
          <span>© {new Date().getFullYear()} TrackingRT. Todos los derechos reservados.</span>
          <div className="flex gap-4">
            <span>Privacidad</span>
            <span>Términos</span>
            <span>Soporte</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
