// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: "client", // 👈 make sure Vite knows where your index.html is
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"), // 👈 now @ maps to client/src
    },
  },
  plugins: [react()],
});



