import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  server: {
    proxy: {
      '/user': 'http://localhost:5001'
    }
  },
  plugins: [react()],
});
