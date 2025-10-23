import { useQuery } from "@tanstack/react-query";
import { listTickets } from "../api/tickets";
import { Link } from "react-router-dom";

export default function TicketsList() {
  const { data: tickets = [], isLoading, isError } = useQuery({
    queryKey: ["tickets"],
    queryFn: listTickets,
  });

  if (isLoading) return <p className="text-gray-500">Cargando tickets...</p>;
  if (isError) return <p className="text-red-600">Error al cargar los tickets.</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Tickets registrados</h2>
        <Link
          to="/tickets/new"
          className="border rounded px-3 py-1 bg-blue-600 text-white hover:bg-blue-700"
        >
          Nuevo ticket
        </Link>
      </div>

      {tickets.length === 0 ? (
        <p className="text-gray-600">No hay tickets registrados.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2 text-left">Título</th>
                <th className="border p-2">Prioridad</th>
                <th className="border p-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id} className="border hover:bg-gray-50">
                  <td className="border p-2 text-center">
                    <Link className="underline text-blue-600" to={`/tickets/${t.id}`}>
                      #{t.id}
                    </Link>
                  </td>
                  <td className="border p-2">
                    <Link className="underline text-blue-600" to={`/tickets/${t.id}`}>
                      {t.title}
                    </Link>
                  </td>
                  <td className="border p-2 text-center capitalize">{t.priority}</td>
                  <td className="border p-2 text-center capitalize">{t.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
