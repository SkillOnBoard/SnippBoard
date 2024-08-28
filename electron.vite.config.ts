import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    build: {
      outDir: 'dist/main'
    },
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    build: {
      outDir: 'dist/preload'
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    build: {
      outDir: 'dist/renderer'
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src/renderer')
      }
    },
    plugins: [react()]
  }
})
