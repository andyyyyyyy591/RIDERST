import NewOrderForm from "@/components/NewOrderForm";

export default function AdminCreatePage() {
  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-black text-gray-900">Nuevo pedido</h1>
        <p className="text-sm text-gray-400 mt-0.5">Completá los datos para generar el código de seguimiento.</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <NewOrderForm />
      </div>
    </div>
  );
}
