import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const linkBase =
  "block px-3 py-2 rounded-md text-sm font-medium transition-colors";
const linkActive = "bg-white text-gray-900 shadow-sm";
const linkIdle = "text-gray-600 hover:bg-gray-200/60";

export default function Layout(){
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <aside className="bg-gray-100 border-r">
        <div className="h-16 px-4 flex items-center gap-2 border-b">
          <div className="h-8 w-8 grid place-items-center rounded-lg bg-amber-400/80 text-gray-900"></div>
          <div className="font-semibold">Tickets</div>
        </div>

        <nav className="p-3 space-y-1">
          <NavLink to="/dashboard" className={({isActive}) => `${linkBase} ${isActive?linkActive:linkIdle}`}>Dashboard</NavLink>
          <NavLink to="/tickets"   className={({isActive}) => `${linkBase} ${isActive?linkActive:linkIdle}`}>Tickets</NavLink>
          <NavLink to="/board"     className={({isActive}) => `${linkBase} ${isActive?linkActive:linkIdle}`}>Tablero</NavLink>
        </nav>
      </aside>

      {/* Main */}
      <div className="bg-white">
        {/* Topbar */}
        <header className="h-16 px-6 flex items-center justify-between border-b bg-white/70 backdrop-blur">
          <div className="text-sm text-gray-500">
            Bienvenida, <span className="font-semibold text-gray-900">{user?.name}</span>
          </div>
          <button
            onClick={logout}
            className="text-sm text-red-600 hover:bg-red-50 border border-red-200 px-3 py-1 rounded-md"
          >
            Cerrar sesión
          </button>
        </header>

        <main className="p-6 max-w-6xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
