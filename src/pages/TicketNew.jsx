import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTicket } from "../api/tickets";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function TicketNew() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [err, setErr] = useState("");
  const [pending, setPending] = useState(false);

  const mutation = useMutation({
    mutationFn: createTicket,
    onMutate: () => setPending(true),
    onSuccess: (t) => {
      // refresca listado y tablero
      qc.invalidateQueries({ queryKey: ["tickets"] });
      // ve directo al detalle del ticket creado
      navigate(`/tickets/${t.id}`);
    },
    onError: (e) => {
      setErr(e?.response?.data?.message || "No se pudo crear el ticket");
    },
    onSettled: () => setPending(false),
  });

  const submit = (e) => {
    e.preventDefault();
    setErr("");

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const title = data.title?.trim();
    const description = data.description?.trim();
    const priority = data.priority || "medium";

    if (!title || !description) {
      setErr("Título y descripción son obligatorios.");
      return;
    }

    mutation.mutate({ title, description, priority });
  };

  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">Nuevo ticket</h2>
        <Link className="text-sm underline text-blue-600" to="/tickets">
          ← Volver
        </Link>
      </div>

      {err && <div className="mb-3 text-sm text-red-600">{err}</div>}

      <form onSubmit={submit} className="space-y-3 bg-white border rounded-xl p-4">
        <label className="block">
          <span className="text-sm text-gray-600">Título</span>
          <input
            name="title"
            className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            placeholder="Ej: No hay internet en CDD Cobán"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-600">Descripción</span>
          <textarea
            name="description"
            className="mt-1 w-full border rounded-md px-3 py-2 min-h-28 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            placeholder="Describe el problema con detalle…"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-600">Prioridad</span>
          <select
            name="priority"
            defaultValue="medium"
            className="mt-1 w-full border rounded-md px-3 py-2"
          >
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
            <option value="urgent">Urgente</option>
          </select>
        </label>

        <button
          disabled={pending}
          className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 disabled:opacity-60"
        >
          {pending ? "Guardando…" : "Crear ticket"}
        </button>
      </form>
    </div>
  );
}
