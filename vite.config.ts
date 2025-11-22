import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  return {
    base: "/KN-GROWTH/",

    server: {
      port: 3000,
      host: "0.0.0.0",
    },
    plugins: [react()],
    define: {
      "process.env.API_KEY": JSON.stringify(env.GEMINI_API_KEY),
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    // ¡¡¡ASEGÚRATE DE QUE ESTE BLOQUE ESTÉ AQUÍ Y CORRECTO!!!
    build: {
      rollupOptions: {
        input: "index.html", // Esto le dice a Vite dónde buscar el index.html para la compilación
      },
    },
    // --- FIN DEL BLOQUE ---
  };
});
