import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// import browserslist from "browserslist";
// import { browserslistToTargets } from "lightningcss";

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5890,
    proxy: {
      "/sitemap.xml": {
        target: "http://localhost:8765",
        changeOrigin: true,
      },
      "/robots.txt": {
        target: "http://localhost:8765",
        changeOrigin: true,
      },
    },
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // css: {
  //   transformer: "lightningcss",
  //   lightningcss: {
  //     targets: browserslistToTargets(browserslist(">= 0.25%")),
  //   },
  // },
  // build: {
  //   cssMinify: "lightningcss",
  // },
});
