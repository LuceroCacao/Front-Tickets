import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listTickets, transitionTicket } from "../api/tickets";

const Column = ({title, items, onMove, toLeft, toRight})=>(
  <section className="bg-white border rounded-xl p-3 space-y-2">
    <div className="flex items-center justify-between">
      <h3 className="font-semibold">{title}</h3>
      <span className="text-xs text-gray-500">{items.length}</span>
    </div>
    {items.length===0 ? (
      <div className="text-sm text-gray-500 text-center py-6">Sin tickets</div>
    ): items.map(t=>(
      <div key={t.id} className="border rounded-lg p-3 shadow-sm">
        <div className="font-medium">{t.title}</div>
        <div className="text-xs text-gray-500">{t.description}</div>
        <div className="mt-2 flex justify-between">
          {toLeft && <button onClick={()=>onMove(t.id, toLeft)} className="text-xs border px-2 py-1 rounded hover:bg-gray-50">◀</button>}
          {toRight && <button onClick={()=>onMove(t.id, toRight)} className="text-xs border px-2 py-1 rounded hover:bg-gray-50">▶</button>}
        </div>
      </div>
    ))}
  </section>
);

export default function BoardPage(){
  const qc = useQueryClient();
  const { data: rows=[] } = useQuery({ queryKey:["tickets"], queryFn: listTickets });
  const move = useMutation({
    mutationFn: ({id,to}) => transitionTicket(id,to),
    onSuccess: () => qc.invalidateQueries({queryKey:["tickets"]})
  });

  const groups = {
    pending: rows.filter(t=>t.status==="pending"),
    in_progress: rows.filter(t=>t.status==="in_progress"),
    resolved: rows.filter(t=>t.status==="resolved"),
  };

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Column title="Pendiente"   items={groups.pending}     onMove={(id,to)=>move.mutate({id,to})} toRight="in_progress" />
      <Column title="En progreso" items={groups.in_progress} onMove={(id,to)=>move.mutate({id,to})} toLeft="pending" toRight="resolved" />
      <Column title="Resuelto"    items={groups.resolved}    onMove={(id,to)=>move.mutate({id,to})} toLeft="in_progress" />
    </div>
  );
}
