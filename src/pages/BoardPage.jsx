import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listTickets, transitionTicket } from "../api/tickets";

export default function BoardPage() {
  const queryClient = useQueryClient();

  const { data: tickets = [] } = useQuery({
    queryKey: ["tickets"],
    queryFn: listTickets,
  });

  const mutation = useMutation({
    mutationFn: ({ id, to }) => transitionTicket(id, to),
    onSuccess: () => queryClient.invalidateQueries(["tickets"]),
  });

  const handleMove = (id, to) => {
    mutation.mutate({ id, to });
  };

  const grouped = {
    pending: tickets.filter((t) => t.status === "pending"),
    in_progress: tickets.filter((t) => t.status === "in_progress"),
    resolved: tickets.filter((t) => t.status === "resolved"),
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {[
        { key: "pending", label: "Pendiente" },
        { key: "in_progress", label: "En progreso" },
        { key: "resolved", label: "Resuelto" },
      ].map((col) => (
        <div key={col.key} className="border rounded p-3 bg-gray-50">
          <h3 className="font-semibold text-center mb-2">{col.label}</h3>
          {grouped[col.key].length === 0 ? (
            <p className="text-sm text-gray-500 text-center">Sin tickets</p>
          ) : (
            grouped[col.key].map((t) => (
              <div
                key={t.id}
                className="border rounded p-2 bg-white shadow-sm mb-2"
              >
                <h4 className="font-semibold text-sm">{t.title}</h4>
                <p className="text-xs text-gray-600">{t.description}</p>
                <p className="text-xs mt-1">
                  <b>Prioridad:</b> {t.priority}
                </p>

                <div className="mt-2 flex justify-between">
                  {col.key !== "pending" && (
                    <button
                      onClick={() =>
                        handleMove(t.id, col.key === "resolved" ? "in_progress" : "pending")
                      }
                      className="text-xs text-gray-600 border rounded px-2 py-1 hover:bg-gray-200"
                    >
                      ◀️
                    </button>
                  )}
                  {col.key !== "resolved" && (
                    <button
                      onClick={() =>
                        handleMove(
                          t.id,
                          col.key === "pending" ? "in_progress" : "resolved"
                        )
                      }
                      className="text-xs text-blue-600 border rounded px-2 py-1 hover:bg-blue-100"
                    >
                      ▶️
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
}
