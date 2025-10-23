import { useQuery } from "@tanstack/react-query";
import { listTickets } from "../api/tickets";
import { Link } from "react-router-dom";

const Badge = ({children, kind="status"})=>{
  const map = kind==="priority"
    ? { urgent:"bg-red-100 text-red-700", high:"bg-orange-100 text-orange-700", medium:"bg-amber-100 text-amber-700", low:"bg-gray-100 text-gray-700" }
    : { pending:"bg-gray-100 text-gray-700", in_progress:"bg-blue-100 text-blue-700", resolved:"bg-green-100 text-green-700" };
  return <span className={`px-2 py-0.5 text-xs rounded capitalize ${map[children]||"bg-gray-100"}`}>{children}</span>;
};

export default function TicketsList(){
  const { data: tickets=[], isLoading, isError } = useQuery({ queryKey:["tickets"], queryFn: listTickets });

  if (isLoading) return <p className="text-gray-500">Cargando tickets…</p>;
  if (isError)   return <p className="text-red-600">Error al cargar los tickets.</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Tickets</h2>
        <Link to="/tickets/new" className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700">
          Nuevo ticket
        </Link>
      </div>

      {tickets.length===0 ? (
        <div className="border rounded-xl p-8 text-center text-gray-600 bg-white">
          No hay tickets aún. <Link to="/tickets/new" className="underline text-blue-600">Crea el primero</Link>.
        </div>
      ):(
        <div className="overflow-hidden rounded-xl border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Título</th>
                <th className="p-3">Prioridad</th>
                <th className="p-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t,i)=>(
                <tr key={t.id} className={i%2 ? "bg-white" : "bg-gray-50/40"}>
                  <td className="p-3">
                    <Link className="underline text-blue-600" to={`/tickets/${t.id}`}>#{t.id}</Link>
                  </td>
                  <td className="p-3">
                    <Link className="underline text-blue-600" to={`/tickets/${t.id}`}>{t.title}</Link>
                    <div className="text-xs text-gray-500 line-clamp-1">{t.description}</div>
                  </td>
                  <td className="p-3 text-center"><Badge kind="priority">{t.priority}</Badge></td>
                  <td className="p-3 text-center"><Badge kind="status">{t.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
