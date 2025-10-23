import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Este componente protege rutas que solo deben verse si hay sesión activa
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Cargando...</div>;
  }

  // Si no está autenticado, lo redirige al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si todo está bien, muestra el contenido protegido
  return children;
}
