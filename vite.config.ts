import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import 'vite-react-ssg'

export default defineConfig({
  // VITE_BASE_URL env var sets the base path:
  //   npm run build      → GitHub Pages (/greater-boston-livery/)
  //   npm run build:prod → Production (/)
  base: process.env.VITE_BASE_URL || '/greater-boston-livery/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  ssgOptions: {
    dirStyle: 'nested',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/framer-motion')) return 'vendor-motion'
        },
      },
    },
  },
  ssr: {
    noExternal: ['react-helmet-async'],
  },
})
