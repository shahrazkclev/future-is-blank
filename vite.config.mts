import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  // Keep project root default (repository root)
  server: {
    port: 8080,
  },
  publicDir: "public",
  resolve: {
    alias: [
      // Map internal Excalidraw packages
      {
        find: /^@excalidraw\/common$/,
        replacement: path.resolve(__dirname, "packages/common/src/index.ts"),
      },
      {
        find: /^@excalidraw\/common\/(.*?)/,
        replacement: path.resolve(__dirname, "packages/common/src/$1"),
      },
      {
        find: /^@excalidraw\/element$/,
        replacement: path.resolve(__dirname, "packages/element/src/index.ts"),
      },
      {
        find: /^@excalidraw\/element\/(.*?)/,
        replacement: path.resolve(__dirname, "packages/element/src/$1"),
      },
      {
        find: /^@excalidraw\/excalidraw$/,
        replacement: path.resolve(__dirname, "packages/excalidraw/index.tsx"),
      },
      {
        find: /^@excalidraw\/excalidraw\/(.*?)/,
        replacement: path.resolve(__dirname, "packages/excalidraw/$1"),
      },
      {
        find: /^@excalidraw\/math$/,
        replacement: path.resolve(__dirname, "packages/math/src/index.ts"),
      },
      {
        find: /^@excalidraw\/math\/(.*?)/,
        replacement: path.resolve(__dirname, "packages/math/src/$1"),
      },
      {
        find: /^@excalidraw\/utils$/,
        replacement: path.resolve(__dirname, "packages/utils/src/index.ts"),
      },
      {
        find: /^@excalidraw\/utils\/(.*?)/,
        replacement: path.resolve(__dirname, "packages/utils/src/$1"),
      },
      {
        find: /^excalidraw-app\/(.*?)/,
        replacement: path.resolve(__dirname, "excalidraw-app/$1"),
      },
    ],
  },
  build: {
    outDir: "build",
    sourcemap: true,
    assetsInlineLimit: 0,
  },
  optimizeDeps: {
    exclude: ["excalidraw-app"]
  },
  plugins: [
    react(),
    // Needed to resolve `virtual:pwa-register` used by the app entry
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        globIgnores: [
          "fonts.css",
          "**/locales/**",
          "service-worker.js",
          "**/*.chunk-*.js",
        ],
      },
      manifest: {
        short_name: "CleverPoly Scriptor",
        name: "CleverPoly Scriptor",
        description: "Collaborative whiteboard tool",
        icons: [
          { src: "android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "apple-touch-icon.png", sizes: "180x180", type: "image/png" },
        ],
        start_url: "/",
        display: "standalone",
        theme_color: "#121212",
        background_color: "#ffffff",
      },
    }),
  ],
});
