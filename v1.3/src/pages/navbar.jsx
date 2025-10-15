import React from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";

function Navbar() {
  const { cantidadTotal } = useCarrito();

  return (
    <nav>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/productos">Productos</Link></li>
        <li><Link to="/servicios">Servicios</Link></li>
        <li>
          <Link to="/carrito">
            Carrito {cantidadTotal > 0 && `(${cantidadTotal})`}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
