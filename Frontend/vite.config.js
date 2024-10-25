import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  server: {
    strictPort: true,
    proxy: {
      "/product/api": {
        target: "https://tech-r.vercel.app/product/api",
        changeOrigin: true,
      },
    },
  },
});
