import { useQuery } from "@tanstack/react-query";
import { listTickets } from "../api/tickets";
import { Link } from "react-router-dom";

export default function TicketsList() {
  const { data: tickets = [] } = useQuery({
    queryKey: ["tickets"],
    queryFn: listTickets,
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Tickets registrados</h2>
        <Link to="/tickets/new" className="border rounded px-3 py-1 bg-blue-600 text-white hover:bg-blue-700">
          Nuevo ticket
        </Link>
      </div>

      {tickets.length === 0 ? (
        <p className="text-gray-600">No hay tickets registrados.</p>
      ) : (
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Título</th>
              <th className="border p-2">Prioridad</th>
              <th className="border p-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.id} className="border hover:bg-gray-50">
                <td className="border p-2 text-center">{t.id}</td>
                <td className="border p-2">{t.title}</td>
                <td className="border p-2 text-center">{t.priority}</td>
                <td className="border p-2 text-center">{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
