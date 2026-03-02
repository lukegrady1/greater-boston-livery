import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  // Use `npm run build` for GitHub Pages (base: /greater-boston-livery/)
  // Use `npm run build:prod` for production at greaterbostonlivery.com (base: /)
  base: '/greater-boston-livery/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
