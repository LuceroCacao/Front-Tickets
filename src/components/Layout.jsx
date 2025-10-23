import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Layout base del sistema (sidebar + header)
export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex text-gray-900">
      {/* Sidebar */}
      <aside className="w-60 border-r bg-gray-50 p-4 space-y-2">
        <h1 className="font-bold text-lg text-center mb-4">Tickets</h1>
        <nav className="space-y-1">
          <Link to="/dashboard" className="block hover:underline">Dashboard</Link>
          <Link to="/tickets" className="block hover:underline">Tickets</Link>
          <Link to="/board" className="block hover:underline">Tablero</Link>
        </nav>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-12 border-b px-4 flex items-center justify-between bg-white">
          <span>Bienvenid@, <b>{user?.name}</b></span>
          <button onClick={logout} className="text-sm text-red-600 hover:underline">
            Cerrar sesión
          </button>
        </header>

        {/* Página actual */}
        <main className="p-4 flex-1 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
