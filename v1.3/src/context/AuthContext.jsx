// ====================================================
// IMPORTACIONES
// ====================================================
import React, { createContext, useContext, useState, useEffect } from 'react';
// createContext: Crea un contexto de React para compartir datos entre componentes
// useContext: Hook para acceder al valor del contexto
// useState: Hook para manejar estado local del componente
// useEffect: Hook para ejecutar efectos secundarios (como leer localStorage)

// ====================================================
// CREACIÓN DEL CONTEXTO
// ====================================================
// createContext() crea un objeto de contexto que nos permite compartir
// el estado de autenticación en toda la aplicación sin pasar props manualmente
const AuthContext = createContext();

// ====================================================
// HOOK PERSONALIZADO: useAuth
// ====================================================
/**
 * Hook personalizado para acceder al contexto de autenticación
 * Este patrón es común en React para simplificar el uso de contextos
 * 
 * @returns {Object} - Objeto con las funciones y estado de autenticación
 * @throws {Error} - Si se usa fuera de un AuthProvider
 * 
 * Uso:
 *   const { usuario, iniciarSesion, cerrarSesion } = useAuth();
 */
export const useAuth = () => {
  // useContext() extrae el valor actual del contexto
  const context = useContext(AuthContext);
  
  // Validación: Si context es undefined, significa que el componente
  // no está envuelto en <AuthProvider>, entonces lanzamos un error
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  
  // Retornamos el contexto para que el componente pueda usarlo
  return context;
};

// ====================================================
// COMPONENTE PROVEEDOR: AuthProvider
// ====================================================
/**
 * Proveedor del contexto de autenticación
 * Este componente envuelve toda la aplicación y proporciona el estado
 * de autenticación a todos los componentes hijos
 * 
 * @param {Object} props - Propiedades del componente
 * @param {ReactNode} props.children - Componentes hijos que tendrán acceso al contexto
 * 
 * Responsabilidades:
 * - Mantener el estado del usuario autenticado
 * - Persistir y recuperar la sesión desde localStorage
 * - Proporcionar funciones para iniciar/cerrar sesión
 */
export const AuthProvider = ({ children }) => {
  // ====================================================
  // ESTADO LOCAL
  // ====================================================
  
  // useState(null): Inicializa el estado 'usuario' en null (no autenticado)
  // setUsuario: Función para actualizar el estado del usuario
  const [usuario, setUsuario] = useState(null);
  
  // Estado para indicar si estamos cargando los datos del localStorage
  // Importante para evitar parpadeos en la UI durante la carga inicial
  const [cargando, setCargando] = useState(true);

  // ====================================================
  // EFECTO: RECUPERAR SESIÓN AL MONTAR
  // ====================================================
  /**
   * useEffect se ejecuta después de que el componente se renderiza
   * El array vacío [] significa que solo se ejecuta UNA VEZ al montar el componente
   * 
   * Propósito: Verificar si existe una sesión guardada en localStorage
   * y restaurar el estado del usuario
   */
  useEffect(() => {
    // localStorage.getItem('usuario'): Recupera el valor guardado con la clave 'usuario'
    // localStorage es una API del navegador que persiste datos entre sesiones
    const usuarioGuardado = localStorage.getItem('usuario');
    
    // Si existe un usuario guardado (no es null)
    if (usuarioGuardado) {
      // JSON.parse(): Convierte el string JSON de vuelta a un objeto JavaScript
      // localStorage solo guarda strings, por eso necesitamos parsear
      setUsuario(JSON.parse(usuarioGuardado));
    }
    
    // Marcamos que terminamos de cargar
    setCargando(false);
  }, []); // Array vacío = solo se ejecuta al montar el componente

  // ====================================================
  // FUNCIÓN: INICIAR SESIÓN
  // ====================================================
  /**
   * Inicia sesión de un usuario con su email
   * 
   * @param {string} email - Email del usuario que inicia sesión
   * 
   * Proceso:
   * 1. Crea un objeto usuario con email y fecha de ingreso
   * 2. Actualiza el estado local (React)
   * 3. Guarda el usuario en localStorage (navegador) para persistencia
   */
  const iniciarSesion = (email) => {
    // Creamos un objeto con los datos del usuario
    const nuevoUsuario = {
      email, // Sintaxis corta de ES6: equivale a { email: email }
      fechaIngreso: new Date().toISOString() // Fecha actual en formato ISO
    };
    
    // Actualizamos el estado de React con el nuevo usuario
    setUsuario(nuevoUsuario);
    
    // Guardamos en localStorage para que persista entre sesiones
    // JSON.stringify(): Convierte el objeto JavaScript a string JSON
    localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
  };

  // ====================================================
  // FUNCIÓN: CERRAR SESIÓN
  // ====================================================
  /**
   * Cierra la sesión del usuario actual
   * 
   * Proceso:
   * 1. Limpia el estado local de React (usuario = null)
   * 2. Elimina el usuario del localStorage
   */
  const cerrarSesion = () => {
    // Establecemos el usuario en null (no autenticado)
    setUsuario(null);
    
    // Eliminamos el usuario del localStorage
    // Esto asegura que no se restaure la sesión al recargar la página
    localStorage.removeItem('usuario');
  };

  // ====================================================
  // FUNCIÓN: VERIFICAR AUTENTICACIÓN
  // ====================================================
  /**
   * Verifica si hay un usuario autenticado actualmente
   * 
   * @returns {boolean} - true si hay un usuario autenticado, false si no
   * 
   * Uso común:
   *   if (estaAutenticado()) {
   *     // Mostrar contenido para usuarios autenticados
   *   }
   */
  const estaAutenticado = () => {
    // Retorna true si usuario no es null, false si es null
    return usuario !== null;
  };

  // ====================================================
  // VALOR DEL CONTEXTO
  // ====================================================
  /**
   * Este objeto contiene todo lo que queremos compartir con los componentes
   * que consuman este contexto
   * 
   * Cualquier componente que use useAuth() tendrá acceso a:
   * - usuario: Objeto con datos del usuario actual (o null)
   * - iniciarSesion: Función para autenticar
   * - cerrarSesion: Función para desautenticar
   * - estaAutenticado: Función para verificar autenticación
   * - cargando: Boolean que indica si estamos cargando datos iniciales
   */
  const value = {
    usuario,           // Estado actual del usuario
    iniciarSesion,     // Función para login
    cerrarSesion,      // Función para logout
    estaAutenticado,   // Función de verificación
    cargando           // Estado de carga inicial
  };

  // ====================================================
  // RENDERIZADO DEL PROVEEDOR
  // ====================================================
  /**
   * AuthContext.Provider es el componente que hace disponible
   * el contexto a todos sus hijos
   * 
   * - value={value}: Pasa el objeto 'value' como valor del contexto
   * - {children}: Renderiza todos los componentes hijos que envuelve
   * 
   * Ejemplo de uso en App.jsx:
   *   <AuthProvider>
   *     <App />
   *   </AuthProvider>
   */
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
