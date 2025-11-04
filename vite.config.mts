import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import { VitePWA } from "vite-plugin-pwa";
import { createHtmlPlugin } from "vite-plugin-html";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default defineConfig({
  root: path.resolve(__dirname, "Desktop/newww/excalidraw-app"),
  publicDir: path.resolve(__dirname, "Desktop/newww/public"),
  envDir: path.resolve(__dirname, "Desktop/newww"),
  
  server: {
    port: 8080,
    open: true,
  },

  resolve: {
    alias: [
      {
        find: /^@excalidraw\/common$/,
        replacement: path.resolve(
          __dirname,
          "Desktop/newww/packages/common/src/index.ts",
        ),
      },
      {
        find: /^@excalidraw\/common\/(.*?)/,
        replacement: path.resolve(__dirname, "Desktop/newww/packages/common/src/$1"),
      },
      {
        find: /^@excalidraw\/element$/,
        replacement: path.resolve(
          __dirname,
          "Desktop/newww/packages/element/src/index.ts",
        ),
      },
      {
        find: /^@excalidraw\/element\/(.*?)/,
        replacement: path.resolve(__dirname, "Desktop/newww/packages/element/src/$1"),
      },
      {
        find: /^@excalidraw\/excalidraw$/,
        replacement: path.resolve(
          __dirname,
          "Desktop/newww/packages/excalidraw/index.tsx",
        ),
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
        replacement: path.resolve(
          __dirname,
          "Desktop/newww/packages/utils/src/index.ts",
        ),
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
    svgrPlugin(),
    ViteEjsPlugin(),
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
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "apple-touch-icon.png",
            type: "image/png",
            sizes: "180x180",
          },
        ],
        start_url: "/",
        display: "standalone",
        theme_color: "#121212",
        background_color: "#ffffff",
      },
    }),
    createHtmlPlugin({
      minify: true,
    }),
  ],
});
