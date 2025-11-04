import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  // Keep project root default (repository root). We proxy-load the Excalidraw app via src/main.tsx
  server: {
    port: 8080,
  },
  resolve: {
    alias: [
      // Map internal Excalidraw packages used in the imported app
      {
        find: /^@excalidraw\/common$/,
        replacement: path.resolve(__dirname, "Desktop/newww/packages/common/src/index.ts"),
      },
      {
        find: /^@excalidraw\/common\/(.*?)/,
        replacement: path.resolve(__dirname, "Desktop/newww/packages/common/src/$1"),
      },
      {
        find: /^@excalidraw\/element$/,
        replacement: path.resolve(__dirname, "Desktop/newww/packages/element/src/index.ts"),
      },
      {
        find: /^@excalidraw\/element\/(.*?)/,
        replacement: path.resolve(__dirname, "Desktop/newww/packages/element/src/$1"),
      },
      {
        find: /^@excalidraw\/excalidraw$/,
        replacement: path.resolve(__dirname, "Desktop/newww/packages/excalidraw/index.tsx"),
      },
      {
        find: /^@excalidraw\/excalidraw\/(.*?)/,
        replacement: path.resolve(__dirname, "Desktop/newww/packages/excalidraw/$1"),
      },
      {
        find: /^@excalidraw\/math$/,
        replacement: path.resolve(__dirname, "Desktop/newww/packages/math/src/index.ts"),
      },
      {
        find: /^@excalidraw\/math\/(.*?)/,
        replacement: path.resolve(__dirname, "Desktop/newww/packages/math/src/$1"),
      },
      {
        find: /^@excalidraw\/utils$/,
        replacement: path.resolve(__dirname, "Desktop/newww/packages/utils/src/index.ts"),
      },
      {
        find: /^@excalidraw\/utils\/(.*?)/,
        replacement: path.resolve(__dirname, "Desktop/newww/packages/utils/src/$1"),
      },
      {
        find: /^excalidraw-app\/(.*?)/,
        replacement: path.resolve(__dirname, "Desktop/newww/excalidraw-app/$1"),
      },
    ],
  },
  build: {
    outDir: "build",
    sourcemap: true,
    assetsInlineLimit: 0,
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
