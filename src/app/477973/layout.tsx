import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-base font-black text-gray-900">
            tracking<span className="text-blue-700">rt</span>
            <span className="text-gray-400 font-normal text-sm ml-1.5">Admin</span>
          </span>
          <nav className="flex items-center gap-1">
            <Link
              href="/477973"
              className="px-3 py-1.5 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Nuevo pedido
            </Link>
            <Link
              href="/477973/pedidos"
              className="px-3 py-1.5 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Ver pedidos
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {children}
      </div>
    </div>
  );
}
