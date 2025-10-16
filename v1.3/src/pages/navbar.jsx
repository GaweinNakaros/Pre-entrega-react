// ====================================================
// IMPORTACIONES
// ====================================================
import React from "react";
// Link: Componente de react-router-dom para navegación sin recargar la página
import { Link } from "react-router-dom";
// Nuestros hooks personalizados de los contextos
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";

// Importación de la hoja de estilos del navbar
import './navbar.css';

// ====================================================
// COMPONENTE: NAVBAR (BARRA DE NAVEGACIÓN)
// ====================================================
/**
 * Barra de navegación principal de la aplicación
 * 
 * Responsabilidades:
 * - Mostrar enlaces de navegación principales
 * - Mostrar cantidad de productos en el carrito
 * - Mostrar información del usuario si está autenticado
 * - Proporcionar opción de cerrar sesión
 * 
 * Este componente consume dos contextos:
 * 1. CarritoContext: Para mostrar la cantidad de productos
 * 2. AuthContext: Para mostrar/ocultar opciones según autenticación
 */
function Navbar() {
  // ====================================================
  // CONTEXTOS
  // ====================================================
  // Del contexto del carrito, solo necesitamos la cantidad total
  const { cantidadTotal } = useCarrito();
  
  // Del contexto de autenticación, extraemos varias propiedades
  const { usuario, cerrarSesion, estaAutenticado } = useAuth();

  // ====================================================
  // FUNCIÓN: MANEJAR CIERRE DE SESIÓN
  // ====================================================
  /**
   * Maneja el clic en el botón de cerrar sesión
   * Muestra una confirmación antes de cerrar la sesión
   * 
   * window.confirm(): Función nativa del navegador que muestra un diálogo
   * - Si el usuario hace clic en "Aceptar", retorna true
   * - Si hace clic en "Cancelar", retorna false
   */
  const manejarCerrarSesion = () => {
    // Mostramos un diálogo de confirmación
    if (window.confirm("¿Deseas cerrar sesión?")) {
      // Si el usuario confirma, cerramos la sesión
      cerrarSesion();
    }
    // Si cancela, no hacemos nada (la función termina)
  };

  // ====================================================
  // RENDERIZADO DEL COMPONENTE
  // ====================================================
  return (
    <nav>
      <ul>
        {/* Enlaces de navegación principales */}
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/productos">Productos</Link></li>
        <li><Link to="/servicios">Servicios</Link></li>
        
        {/* ================================================
            ENLACE AL CARRITO CON CANTIDAD
            ================================================
            Muestra "Carrito" y opcionalmente la cantidad con un badge
            
            {cantidadTotal > 0 && ...}
            - Si cantidadTotal es mayor a 0, muestra el badge
            - Si es 0, no muestra nada
            
            className="carrito-badge":
            - Clase CSS que da estilo al badge circular
            - Ubicada en navbar.css con animación de pulso
        */}
        <li>
          <Link to="/carrito">
            Carrito 
            {cantidadTotal > 0 && (
              <span className="carrito-badge">{cantidadTotal}</span>
            )}
          </Link>
        </li>
        
        {/* ================================================
            RENDERIZADO CONDICIONAL: AUTENTICACIÓN
            ================================================
            Operador ternario: condicion ? siTrue : siFalse
            
            Si el usuario está autenticado:
              Muestra su email y botón de cerrar sesión
            Si NO está autenticado:
              Muestra enlace "Iniciar Sesión"
            
            className="navbar-auth":
            - Clase que empuja estos elementos a la derecha del navbar
            - Usa margin-left: auto en navbar.css
        */}
        <div className="navbar-auth">
          {estaAutenticado() ? (
            // ================================================
            // USUARIO AUTENTICADO
            // ================================================
            /**
             * Fragment (<>...</>): Agrupa múltiples elementos sin agregar nodos DOM
             * Es como un contenedor invisible
             * 
             * Sin Fragment:
             *   <div><li>...</li><li>...</li></div>  ← Agrega un div innecesario
             * 
             * Con Fragment:
             *   <><li>...</li><li>...</li></>  ← No agrega nada al DOM
             */
            <>
              {/* Muestra el email del usuario con estilo */}
              <li className="navbar-usuario">
                {/* 
                  usuario?.email
                  Optional chaining (?.) - Acceso seguro a propiedades
                  Si usuario es null/undefined, retorna undefined sin error
                  
                  className="navbar-usuario-icono" y "navbar-usuario-email":
                  - Clases CSS que dan estilo al icono y al email
                  - navbar-usuario-email limita el ancho y agrega ellipsis (...)
                */}
                <span className="navbar-usuario-icono">👤</span>
                <span className="navbar-usuario-email">{usuario?.email}</span>
              </li>
              
              {/* Botón de cerrar sesión */}
              <li>
                {/* 
                  className="btn-cerrar-sesion":
                  - Clase CSS que da estilo al botón
                  - Incluye efectos hover, active y estados de focus
                  - Ya no necesitamos estilos inline
                */}
                <button 
                  onClick={manejarCerrarSesion}
                  className="btn-cerrar-sesion"
                >
                  Cerrar Sesión
                </button>
              </li>
            </>
          ) : (
            // ================================================
            // USUARIO NO AUTENTICADO
            // ================================================
            // Muestra un enlace simple para ir a la página de login
            <li><Link to="/login">Iniciar Sesión</Link></li>
          )}
        </div>
      </ul>
    </nav>
  );
}

// Exportamos el componente como exportación por defecto
export default Navbar;
