import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  server: {
    proxy: {
      '/user': 'http://localhost:5001',
      '/clients': 'http://localhost:5001',
      '/jobs': 'http://localhost:5001',
      '/materials': 'http://localhost:5001',
      '/labor': 'http://localhost:5001'
    }
  },
  plugins: [react()],
});
