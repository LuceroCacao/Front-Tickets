import { createContext, useContext, useEffect, useState } from "react";
import { login as apiLogin, me, logout as apiLogout } from "../api/auth";

// Creamos el contexto (una especie de “memoria global”)
const AuthContext = createContext(null);

// Hook para usar el contexto fácilmente
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // guarda los datos del usuario
  const [loading, setLoading] = useState(true); // controla si está cargando

  // Al iniciar la app, intenta recuperar la sesión anterior
  useEffect(() => {
    const loadUser = async () => {
      try {
        const u = await me(); // consulta el usuario actual (mock o backend)
        setUser(u);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // Función para iniciar sesión
  const login = async (email, password) => {
    const res = await apiLogin(email, password);
    if (res?.token) localStorage.setItem("token", res.token);
    const u = await me();
    setUser(u);
  };

  // Función para cerrar sesión
  const logout = async () => {
    await apiLogout();
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
