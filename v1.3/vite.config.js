import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configuración para GitHub Pages
  // Reemplaza 'Pre-entrega-react' con el nombre de tu repositorio
  base: '/Pre-entrega-react/',
})
