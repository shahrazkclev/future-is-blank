import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { componentTagger } from 'lovable-tagger';

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@excalidraw/common": path.resolve(__dirname, "./Desktop/newww/packages/common/src/index.ts"),
      "@excalidraw/common/(.*)": path.resolve(__dirname, "./Desktop/newww/packages/common/src/$1"),
      "@excalidraw/element": path.resolve(__dirname, "./Desktop/newww/packages/element/src/index.ts"),
      "@excalidraw/element/(.*)": path.resolve(__dirname, "./Desktop/newww/packages/element/src/$1"),
      "@excalidraw/excalidraw": path.resolve(__dirname, "./Desktop/newww/packages/excalidraw/index.tsx"),
      "@excalidraw/excalidraw/(.*)": path.resolve(__dirname, "./Desktop/newww/packages/excalidraw/$1"),
      "@excalidraw/math": path.resolve(__dirname, "./Desktop/newww/packages/math/src/index.ts"),
      "@excalidraw/math/(.*)": path.resolve(__dirname, "./Desktop/newww/packages/math/src/$1"),
      "@excalidraw/utils": path.resolve(__dirname, "./Desktop/newww/packages/utils/src/index.ts"),
      "@excalidraw/utils/(.*)": path.resolve(__dirname, "./Desktop/newww/packages/utils/src/$1"),
      "excalidraw-app/(.*)": path.resolve(__dirname, "./Desktop/newww/excalidraw-app/$1"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
}));
