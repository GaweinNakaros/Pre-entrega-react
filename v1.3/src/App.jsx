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
import IniciarSesion from './pages/IniciarSesion'
import Pago from './pages/Pago'
import RutaProtegida from './pages/RutaProtegida'
// Importación de los proveedores de contexto
import { CarritoProvider } from './context/CarritoContext'
import { AuthProvider } from './context/AuthContext'

/**
 * Componente principal de la aplicación
 * Responsabilidades:
 * - Gestionar el enrutamiento de la aplicación
 * - Proporcionar la estructura general de la app
 * - Envolver la aplicación con los proveedores de contexto (Auth y Carrito)
 * 
 * NO responsable de:
 * - Implementar la lógica del carrito (delegada a CarritoContext)
 * - Implementar la lógica de autenticación (delegada a AuthContext)
 * - Manejar el estado directamente
 */
function App() {
  return (
    <AuthProvider>
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
          {/* Ruta de inicio de sesión */}
          <Route path="/login" element={<IniciarSesion />} />
          {/* Ruta protegida de pago - requiere autenticación */}
          <Route 
            path="/pago" 
            element={
              <RutaProtegida>
                <Pago />
              </RutaProtegida>
            } 
          />
        </Routes>
      </CarritoProvider>
    </AuthProvider>
  )
}

export default App
