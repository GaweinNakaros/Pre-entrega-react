// ====================================================
// IMPORTACIONES
// ====================================================

import React from "react";
import { NavLink } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";
import './navbar.css';

function Navbar() {
  const { cantidadTotal } = useCarrito();
  const { usuario, cerrarSesion, estaAutenticado } = useAuth();

  const manejarCerrarSesion = () => {
    if (window.confirm("¿Deseas cerrar sesión?")) {
      cerrarSesion();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary bg-gradient text-white sticky-top shadow">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/productos">Productos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/servicios">Servicios</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/carrito">
                Carrito
                {cantidadTotal > 0 && <span className="carrito-badge">{cantidadTotal}</span>}
              </NavLink>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-3 ms-auto navbar-auth">
            {estaAutenticado() ? (
              <>
                <div className="d-flex align-items-center gap-2 bg-light bg-opacity-25 rounded px-2 py-1 navbar-usuario">
                  <span className="navbar-usuario-icono">👤</span>
                  <span className="navbar-usuario-email">{usuario?.email}</span>
                </div>
                <button className="btn btn-outline-light btn-sm btn-cerrar-sesion" onClick={manejarCerrarSesion}>
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <NavLink className="nav-link" to="/login">Iniciar Sesión</NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
