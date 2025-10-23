import axios from "axios";

// Leemos la URL base del backend desde las variables de entorno (.env)
const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ej: http://localhost:8000
  withCredentials: true, // útil si usas cookies con Laravel Sanctum
});

// Interceptor para enviar el token en cada petición (si existe)
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default http;
