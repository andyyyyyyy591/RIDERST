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
      {/* Nav */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
          <span className="text-lg font-black text-gray-900">
            tracking<span className="text-blue-700">rt</span>
          </span>
          <nav className="hidden sm:flex items-center gap-6 text-xs text-gray-500 font-medium">
            <span>Inicio</span>
            <span>Servicios</span>
            <span>Contacto</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-blue-800 text-white py-14 px-5">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-blue-300 text-xs font-semibold uppercase tracking-widest mb-3">
            Servicio Internacional de Seguimiento
          </p>
          <h1 className="text-3xl font-black mb-3 leading-tight">
            Consultá el estado<br />de tu envío
          </h1>
          <p className="text-blue-200 text-sm mb-8">
            Seguimiento en tiempo real para envíos entre Estados Unidos y Cuba.
          </p>

          <form onSubmit={handleSearch} className="space-y-2 max-w-sm mx-auto">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="TDC-0000000000"
              autoCapitalize="characters"
              className="w-full px-4 py-3.5 rounded-xl bg-white text-gray-900 placeholder-gray-400 text-center font-mono text-base tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-400 border border-transparent"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors text-sm"
            >
              Consultar estado del envío
            </button>
          </form>
        </div>
      </div>

      {/* Info strips */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="max-w-5xl mx-auto px-5 py-4 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-xs text-gray-500">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-700 inline-block" />
            Envíos marítimos internacionales
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-700 inline-block" />
            Seguimiento detallado de cada etapa
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-700 inline-block" />
            Consulta disponible las 24 hs
          </span>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Footer */}
      <footer className="border-t border-gray-100 py-5 px-5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span className="font-black text-gray-900 text-sm">
            tracking<span className="text-blue-700">rt</span>
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
