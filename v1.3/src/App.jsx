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
import CarritoCompras from './pages/carrito_simple'
// Importación del proveedor del contexto del carrito
import { CarritoProvider } from './context/CarritoContext'

/**
 * Componente principal de la aplicación
 * Responsabilidades:
 * - Gestionar el enrutamiento de la aplicación
 * - Proporcionar la estructura general de la app
 * - Envolver la aplicación con el proveedor del contexto del carrito
 * 
 * NO responsable de:
 * - Implementar la lógica del carrito (delegada a CarritoContext)
 * - Manejar el estado del carrito directamente
 */
function App() {
  return (
    <CarritoProvider>
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
        {/* Ruta del carrito de compras */}
        <Route path="/carrito" element={<CarritoCompras />} />
      </Routes>
    </CarritoProvider>
  )
}

export default App
