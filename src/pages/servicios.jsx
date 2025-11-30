// Importaciones necesarias
import React from "react";
// Componente Link para la navegación
import { Link } from "react-router-dom";
// Importación de estilos
import './servicios.css';

/**
 * Componente Servicios
 * Muestra la página de servicios de la aplicación
 * Incluye una lista de servicios ofrecidos y un botón para volver al inicio
 */
function Servicios() {
  return (
    <div className="servicios-container">
      <h1>Servicios</h1>
      <hr />
      {/* Descripción de servicios */}
      <p>Estos son nuestros servicios.</p>
      {/* Botón de navegación para volver al inicio */}
      <Link to="/">
        <button className="btn-volver">Volver a Inicio</button>
      </Link>
    </div>
  );
}

export default Servicios;
