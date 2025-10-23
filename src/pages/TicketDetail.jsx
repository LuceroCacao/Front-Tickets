import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTicket, transitionTicket } from "../api/tickets";

function Pill({ children, kind = "status" }) {
  const map =
    kind === "priority"
      ? {
          urgent: "bg-red-100 text-red-700",
          high: "bg-orange-100 text-orange-700",
          medium: "bg-yellow-100 text-yellow-700",
          low: "bg-gray-100 text-gray-700",
        }
      : {
          pending: "bg-gray-100 text-gray-700",
          in_progress: "bg-blue-100 text-blue-700",
          resolved: "bg-green-100 text-green-700",
        };
  return (
    <span className={`px-2 py-0.5 text-xs rounded capitalize ${map[children] || "bg-gray-100"}`}>
      {children}
    </span>
  );
}

export default function TicketDetail() {
  const { id } = useParams();
  const qc = useQueryClient();

  const { data: ticket, isLoading, isError } = useQuery({
    queryKey: ["ticket", id],
    queryFn: () => getTicket(id),
  });

  const move = useMutation({
    mutationFn: (to) => transitionTicket(id, to),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tickets"] });
      qc.invalidateQueries({ queryKey: ["ticket", id] });
    },
  });

  if (isLoading) return <div className="p-4">Cargando…</div>;
  if (isError || !ticket) {
    return (
      <div className="p-4">
        <p className="mb-3">No se encontró el ticket.</p>
        <Link to="/tickets" className="underline text-blue-600">← Volver al listado</Link>
      </div>
    );
  }

  const stateButtons = [
    { to: "pending", label: "Pendiente" },
    { to: "in_progress", label: "En progreso" },
    { to: "resolved", label: "Resuelto" },
  ].filter((b) => b.to !== ticket.status);

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Ticket #{ticket.id}</h2>
        <Link to="/tickets" className="text-sm underline text-blue-600">← Volver</Link>
      </div>

      <section className="border rounded p-4 space-y-2 bg-white">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-medium text-lg">{ticket.title}</h3>
          <Pill kind="priority">{ticket.priority}</Pill>
          <Pill kind="status">{ticket.status}</Pill>
        </div>
        <p className="text-gray-700">{ticket.description}</p>
      </section>

      <section className="border rounded p-4 bg-white">
        <div className="font-medium mb-2">Cambiar estado</div>
        <div className="flex gap-2">
          {stateButtons.map((b) => (
            <button
              key={b.to}
              onClick={() => move.mutate(b.to)}
              className="border rounded px-3 py-1 hover:bg-gray-100"
              disabled={move.isPending}
              title={`Mover a: ${b.label}`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </section>

      {/* Secciones futuras */}
      <section className="border rounded p-4 bg-white">
        <div className="font-medium mb-2">Comentarios</div>
        <p className="text-sm text-gray-500">Próximamente…</p>
      </section>
    </div>
  );
}
