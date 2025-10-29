import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configuración dinámica: usa base solo en producción (GitHub Pages)
  // En desarrollo local usa '/'
  base: process.env.NODE_ENV === 'production' ? '/Pre-entrega-react/' : '/',
})
