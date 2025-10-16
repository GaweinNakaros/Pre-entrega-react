// ====================================================
// IMPORTACIONES
// ====================================================
import React, { useState } from 'react';
// useNavigate: Hook de react-router-dom para navegar programáticamente
// useLocation: Hook que nos da información sobre la URL actual
import { useNavigate, useLocation } from 'react-router-dom';
// useAuth: Nuestro hook personalizado para acceder al contexto de autenticación
import { useAuth } from '../context/AuthContext';
// Importamos los estilos CSS específicos para este componente
import './IniciarSesion.css';

// ====================================================
// COMPONENTE: INICIAR SESIÓN
// ====================================================
/**
 * Componente de página de inicio de sesión
 * 
 * Responsabilidades:
 * - Mostrar un formulario para que el usuario ingrese su email
 * - Validar que el email tenga formato correcto
 * - Autenticar al usuario usando el contexto
 * - Redirigir al usuario a la página que intentaba visitar
 * 
 * Flujo:
 * 1. Usuario llega a /login
 * 2. Ingresa su email
 * 3. Sistema valida el formato
 * 4. Si es válido, autentica y redirige
 * 5. Si no, muestra mensaje de error
 */
function IniciarSesion() {
  // ====================================================
  // HOOKS DE ESTADO
  // ====================================================
  // Estado para almacenar el email que el usuario escribe
  const [email, setEmail] = useState(''); // Inicializado como string vacío
  
  // Estado para almacenar mensajes de error de validación
  const [error, setError] = useState(''); // Inicializado como string vacío
  
  // ====================================================
  // HOOKS DE REACT ROUTER
  // ====================================================
  // useNavigate: Nos da una función para navegar a otras rutas programáticamente
  const navigate = useNavigate();
  
  // useLocation: Nos da información sobre la ubicación/URL actual
  // Útil para saber de dónde viene el usuario
  const location = useLocation();
  
  // ====================================================
  // HOOK DE AUTENTICACIÓN
  // ====================================================
  // Extraemos solo la función iniciarSesion del contexto
  // Usamos destructuring para obtener solo lo que necesitamos
  const { iniciarSesion } = useAuth();

  // ====================================================
  // EXTRAER RUTA DE ORIGEN
  // ====================================================
  /**
   * Optional Chaining (?.) - Sintaxis de ES2020
   * location.state?.from?.pathname
   * 
   * Explicación:
   * - location.state puede ser undefined
   * - El operador ?. devuelve undefined si el objeto es null/undefined
   * - Evita errores como "Cannot read property 'from' of undefined"
   * 
   * Si el usuario fue redirigido desde otra página (ej: /pago),
   * RutaProtegida guarda esa ubicación en location.state.from
   * 
   * Si no hay una ruta guardada, usamos '/' (home) como valor por defecto
   * Operador || (OR): Si el lado izquierdo es falsy, usa el lado derecho
   */
  const from = location.state?.from?.pathname || '/';

  // ====================================================
  // FUNCIÓN: VALIDAR EMAIL
  // ====================================================
  /**
   * Valida que un email tenga formato correcto usando expresiones regulares
   * 
   * @param {string} email - El email a validar
   * @returns {boolean} - true si el email es válido, false si no
   * 
   * Expresión Regular (regex) explicada:
   * /^[^\s@]+@[^\s@]+\.[^\s@]+$/
   * 
   * ^             : Inicio del string
   * [^\s@]+       : Uno o más caracteres que NO sean espacios ni @
   * @             : El símbolo @ (obligatorio)
   * [^\s@]+       : Uno o más caracteres que NO sean espacios ni @
   * \.            : Un punto literal (el \ escapa el punto)
   * [^\s@]+       : Uno o más caracteres que NO sean espacios ni @
   * $             : Fin del string
   * 
   * Ejemplos válidos: usuario@email.com, test@dominio.com.ar
   * Ejemplos inválidos: usuario@, @email.com, usuario email.com
   */
  const validarEmail = (email) => {
    // Definimos el patrón de validación
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // test() es un método de las regex que retorna true/false
    return regex.test(email);
  };

  // ====================================================
  // FUNCIÓN: MANEJAR ENVÍO DEL FORMULARIO
  // ====================================================
  /**
   * Se ejecuta cuando el usuario hace submit del formulario
   * 
   * @param {Event} e - Evento del formulario
   * 
   * Proceso:
   * 1. Previene el comportamiento por defecto del formulario
   * 2. Limpia errores anteriores
   * 3. Valida que el email no esté vacío
   * 4. Valida el formato del email
   * 5. Si todo es válido, autentica y redirige
   */
  const manejarSubmit = (e) => {
    // e.preventDefault(): Evita que el formulario recargue la página
    // Por defecto, los formularios HTML recargan la página al hacer submit
    e.preventDefault();
    
    // Limpiamos cualquier error anterior
    setError('');

    // ====================================================
    // VALIDACIÓN 1: EMAIL NO VACÍO
    // ====================================================
    // trim(): Elimina espacios en blanco al inicio y final del string
    // !email.trim(): Si el email está vacío o solo tiene espacios, trim() devuelve ''
    // y el ! lo convierte en true
    if (!email.trim()) {
      setError('Por favor, ingresa tu email');
      return; // Detenemos la ejecución aquí
    }

    // ====================================================
    // VALIDACIÓN 2: FORMATO DE EMAIL
    // ====================================================
    if (!validarEmail(email)) {
      setError('Por favor, ingresa un email válido');
      return; // Detenemos la ejecución aquí
    }

    // ====================================================
    // AUTENTICACIÓN Y REDIRECCIÓN
    // ====================================================
    // Si llegamos aquí, todas las validaciones pasaron
    
    // Autenticamos al usuario con su email
    iniciarSesion(email);
    
    // Navegamos a la ruta que guardamos antes
    // replace: true - Reemplaza la entrada actual del historial
    // Esto evita que el usuario pueda volver al login con el botón "atrás"
    navigate(from, { replace: true });
  };

  // ====================================================
  // RENDERIZADO DEL COMPONENTE
  // ====================================================
  /**
   * JSX - JavaScript XML
   * Permite escribir HTML dentro de JavaScript
   * React lo convierte en elementos de React
   */
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-titulo">Iniciar Sesión</h2>
        <p className="login-descripcion">
          Para continuar con tu compra, por favor ingresa tu email
        </p>

        {/* ================================================
            FORMULARIO DE LOGIN
            ================================================
            onSubmit: Evento que se dispara al hacer submit
            Llamamos a manejarSubmit que maneja las validaciones
        */}
        <form onSubmit={manejarSubmit} className="login-form">
          <div className="form-group">
            {/* htmlFor: Conecta el label con el input (accesibilidad) */}
            <label htmlFor="email" className="form-label">
              Email
            </label>
            
            {/* ================================================
                INPUT DE EMAIL
                ================================================
                type="email": Tipo de input (HTML5)
                id="email": Identificador único del input
                className: En JSX usamos className en vez de class
                placeholder: Texto de ayuda dentro del input
                value={email}: Valor controlado por React (estado)
                onChange: Se ejecuta cada vez que el usuario escribe
                  - (e) => setEmail(e.target.value)
                  - e.target.value es el texto actual del input
                  - setEmail actualiza el estado con ese valor
                autoFocus: El input recibe el foco automáticamente
            */}
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          </div>

          {/* ================================================
              MENSAJE DE ERROR CONDICIONAL
              ================================================
              {error && <p>...</p>}
              
              Explicación del operador &&:
              - Si 'error' es un string vacío '', es falsy, no renderiza nada
              - Si 'error' tiene texto, es truthy, renderiza el <p>
              
              Esto es un "short-circuit evaluation":
              - false && cualquierCosa = false (no evalúa la derecha)
              - true && cualquierCosa = cualquierCosa (evalúa y retorna la derecha)
          */}
          {error && <p className="error-mensaje">{error}</p>}

          {/* Botón de submit del formulario */}
          <button type="submit" className="btn-login">
            Continuar
          </button>
        </form>

        {/* Nota informativa para el usuario */}
        <p className="login-nota">
          💡 Tu email solo se usará para identificarte en esta sesión
        </p>
      </div>
    </div>
  );
}

// Exportamos el componente para poder importarlo en otros archivos
export default IniciarSesion;
