// ====================================================
// IMPORTACIONES
// ====================================================
import React from "react";
// Link: Componente de react-router-dom para navegación sin recargar la página
import { Link } from "react-router-dom";
// Nuestros hooks personalizados de los contextos
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";

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
            Muestra "Carrito" y opcionalmente la cantidad entre paréntesis
            
            {cantidadTotal > 0 && `(${cantidadTotal})`}
            - Si cantidadTotal es mayor a 0, muestra (cantidad)
            - Si es 0, no muestra nada
            
            Template literals (backticks `):
            - Permite insertar variables con ${variable}
            - Ejemplo: si cantidadTotal = 3, muestra "(3)"
        */}
        <li>
          <Link to="/carrito">
            Carrito {cantidadTotal > 0 && `(${cantidadTotal})`}
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
        */}
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
            {/* Muestra el email del usuario */}
            <li style={{ color: '#667eea', fontWeight: 'bold' }}>
              {/* 
                usuario?.email
                Optional chaining (?.) - Acceso seguro a propiedades
                Si usuario es null/undefined, retorna undefined sin error
              */}
              👤 {usuario?.email}
            </li>
            
            {/* Botón de cerrar sesión */}
            <li>
              {/* 
                Botón estilizado con estilos inline
                style={{propiedad: 'valor'}} - Objeto de estilos en React
                Nota: Las propiedades CSS en camelCase (backgroundColor, no background-color)
              */}
              <button 
                onClick={manejarCerrarSesion}
                style={{
                  background: 'transparent',    // Fondo transparente
                  border: 'none',               // Sin borde
                  color: 'inherit',             // Hereda el color del padre
                  cursor: 'pointer',            // Cursor de mano al pasar
                  fontSize: 'inherit',          // Hereda el tamaño de fuente
                  textDecoration: 'underline'   // Texto subrayado
                }}
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
      </ul>
    </nav>
  );
}

// Exportamos el componente como exportación por defecto
export default Navbar;
