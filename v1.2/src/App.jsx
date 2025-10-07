// Importaciones principales
import React from 'react'
// Componentes de enrutamiento de React Router
import { Routes, Route } from 'react-router-dom'
// Importación de componentes de la aplicación
import Navbar from './pages/navbar'
import Inicio from './pages/inicio'
import Servicios from './pages/servicios'
import Productos from './pages/productos'
import ProductoDetalle from './pages/productoDetalle'


/**
 * Componente principal de la aplicación
 * Maneja el enrutamiento y la estructura general de la app
 * Incluye la barra de navegación y las rutas principales
 */
function App() {
  return (
    <>
      {/* Barra de navegación presente en todas las páginas */}
      <Navbar />
      
      {/* Configuración de rutas de la aplicación */}
      <Routes>
        {/* Ruta de la página principal */}
        <Route path="/" element={<Inicio />} />
        {/* Ruta de la página de servicios */}
        <Route path="/servicios" element={<Servicios />} />
        {/* Ruta del catálogo de productos */}
        <Route path="/productos" element={<Productos />} />
        {/* Ruta dinámica para detalles de producto individual */}
        <Route path="/productos/:id" element={<ProductoDetalle />} />
      </Routes>
    </>
  )
}

export default App
