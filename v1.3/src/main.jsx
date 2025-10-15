// Importaciones de React y React DOM
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Estilos globales
import './index.css'
// Componente principal de la aplicación
import App from './App.jsx'
// Router para la navegación
import { BrowserRouter } from 'react-router-dom'

/**
 * Punto de entrada de la aplicación
 * Configura:
 * - StrictMode para desarrollo más seguro
 * - BrowserRouter para el enrutamiento
 * - Renderiza la aplicación en el elemento root
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter permite la navegación en la aplicación */}
    <BrowserRouter>
      {/* Componente principal de la aplicación */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)
