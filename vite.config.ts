import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/sistema-rrhh-prototipo/',
  build: {
    // Optimizaciones de build
    target: 'es2015',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react']
        }
      }
    },
    // Compresión gzip
    reportCompressedSize: true,
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000
  },
  // Optimizaciones de desarrollo
  server: {
    port: 5173,
    host: true
  },
  // Pre-bundling optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react']
  }
})
