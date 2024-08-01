import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: 'app/src',
  build: {
    outDir: '../dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: 'app/src/index.html',
    },
  },
});
