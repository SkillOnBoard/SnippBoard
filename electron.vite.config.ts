import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import react from '@vitejs/plugin-react'
import { mkdir, readdir, copyFile } from 'fs/promises'

export default defineConfig({
  main: {
    publicDir: '/resources',
    build: {
      outDir: 'out/main'
    },
    plugins: [
      externalizeDepsPlugin(),
      {
        name: 'copy-migrations',
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        async buildEnd() {
          const src = resolve(__dirname, 'src/main/migrations')
          const dest = resolve(__dirname, 'out/migrations')

          try {
            await mkdir(dest, { recursive: true })
            const files = await readdir(src)

            for (const file of files) {
              if (file.endsWith('.js')) {
                await copyFile(resolve(src, file), resolve(dest, file))
                console.log(`[copy-migrations] copied file .js to the temporary folder: ${file}`)
              }
            }

            console.log(`[copy-migrations] Copying migrations to ${dest}`)
          } catch (err) {
            console.error('[copy-migrations] Error copying migrations:', err)
          }
        }
      }
    ]
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
