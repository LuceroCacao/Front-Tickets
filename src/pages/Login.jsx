import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Login(){
  const { login, isAuthenticated } = useAuth();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [err,setErr] = useState("");

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const submit = async(e)=>{
    e.preventDefault();
    try { await login(email, password); }
    catch { setErr("No se pudo iniciar sesión"); }
  };

  return (
    <div className="min-h-screen grid place-items-center">
      <form onSubmit={submit} className="w-[360px] bg-white border rounded-xl shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 grid place-items-center rounded-lg bg-amber-400/80"></div>
          <h1 className="text-lg font-semibold">Iniciar sesión</h1>
        </div>

        {err && <div className="text-sm text-red-600">{err}</div>}

        <div className="space-y-1">
          <label className="text-sm text-gray-600">Correo</label>
          <input className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                 value={email} onChange={e=>setEmail(e.target.value)} placeholder="tucorreo@dominio.com"/>
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-600">Contraseña</label>
          <input type="password" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                 value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••"/>
        </div>

        <button className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition">
          Entrar
        </button>
      </form>
    </div>
  );
}
