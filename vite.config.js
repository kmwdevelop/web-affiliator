import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/v2": {
        target: "https://api-gateway.coupang.com",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/v2/, "/v2"),
      },
    },
  },
});
