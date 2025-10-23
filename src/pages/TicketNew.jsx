import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTicket } from "../api/tickets";
import { useNavigate } from "react-router-dom";

export default function TicketNew() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTicket,
    onSuccess: () => {
      queryClient.invalidateQueries(["tickets"]);
      navigate("/tickets");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-3">
      <h2 className="text-lg font-semibold">Nuevo ticket</h2>

      <input name="title" placeholder="Título" required className="w-full border p-2 rounded" />
      <textarea name="description" placeholder="Descripción" required className="w-full border p-2 rounded" />

      <select name="priority" className="w-full border p-2 rounded">
        <option value="low">Baja</option>
        <option value="medium">Media</option>
        <option value="high">Alta</option>
      </select>

      <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
        Guardar
      </button>
    </form>
  );
}
