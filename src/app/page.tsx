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
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Rider<span className="text-orange-400">Track</span>
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Seguimiento de envíos en tiempo real
          </p>
        </div>

        <form onSubmit={handleSearch} className="space-y-3">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Ingresá tu código (ej: TDC-8172628101)"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400 text-center font-mono tracking-wider"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-400 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Rastrear pedido
          </button>
        </form>

        <p className="mt-8 text-slate-500 text-xs">
          ¿Sos del equipo?{" "}
          <a href="/admin" className="text-slate-400 underline hover:text-white">
            Ir al panel admin
          </a>
        </p>
      </div>
    </main>
  );
}
