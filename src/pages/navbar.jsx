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
  const { usuario, cerrarSesion, estaAutenticado, esAdmin } = useAuth();

  const manejarCerrarSesion = () => {
    if (window.confirm("¿Deseas cerrar sesión?")) {
      cerrarSesion();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-gradient sticky-top shadow">
      <div className="container-fluid py-0">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link px-3" to="/" end>Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-3" to="/productos">Productos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-3" to="/servicios">Servicios</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-3 d-flex align-items-center" to="/carrito">
                Carrito
                {cantidadTotal > 0 && (
                  <span className="badge bg-danger rounded-pill ms-2">
                    {cantidadTotal}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-3 ms-auto navbar-auth">
            {estaAutenticado() ? (
              <>
                {esAdmin() && (
                  <NavLink className="nav-link px-3 d-flex align-items-center" to="/admin/productos">
                    <span className="me-1">★</span>Administrar Productos
                  </NavLink>
                )}
                <div className="d-flex align-items-center gap-2 bg-light bg-opacity-25 rounded px-2 py-1 text-white">
                  <span>👤</span>
                  <span className="fw-semibold">{usuario?.email}</span>
                </div>
                <button className="btn btn-outline-light btn-sm" onClick={manejarCerrarSesion}>
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <NavLink className="btn btn-outline-light btn-sm" to="/login">Iniciar Sesión</NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
