import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // 👈 le damos un puerto diferente
    open: true  // abre automáticamente en el navegador
  }
});
