import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    publicDir: '/resources',
    build: {
      outDir: 'out/main'
    },
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    publicDir: '/resources',
    build: {
      outDir: 'out/preload'
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    build: {
      outDir: 'out/renderer'
    },
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [
      react(),
      nodePolyfills({
        include: ['fs', 'path'],
        exclude: [
          'http' // Excludes the polyfill for `http` and `node:http`.
        ]
      })
    ]
  }
})
