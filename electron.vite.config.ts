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
        // Copiar archivos .js a la carpeta temporal
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        async buildEnd() {
          const src = resolve(__dirname, 'src/main/migrations') // Carpeta de origen de migraciones
          const dest = resolve(__dirname, 'out/migrations') // Carpeta temporal para las migraciones

          try {
            // Crear la carpeta de destino si no existe
            await mkdir(dest, { recursive: true })

            // Leer los archivos de migraciones
            const files = await readdir(src)

            // Copiar los archivos .js a la carpeta temporal
            for (const file of files) {
              if (file.endsWith('.js')) {
                await copyFile(resolve(src, file), resolve(dest, file))
                console.log(`[copy-migrations] Copiado archivo .js a la carpeta temporal: ${file}`)
              }
            }

            console.log(`[copy-migrations] Migraciones copiadas a ${dest}`)
          } catch (err) {
            console.error('[copy-migrations] Error al copiar migraciones:', err)
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
