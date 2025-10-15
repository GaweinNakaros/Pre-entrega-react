import React from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import "./carrito_simple.css";

export default function CarritoCompras() {
  const { 
    carrito, 
    quitarCantidad, 
    aumentarCantidad, 
    eliminarProducto, 
    vaciarCarrito: vaciarCarritoContext,
    cantidadTotal,
    totalPrecio 
  } = useCarrito();

  const manejarVaciarCarrito = () => {
    if (window.confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
      vaciarCarritoContext();
    }
  };

  const manejarEliminarProducto = (idProducto) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este producto?")
    ) {
      eliminarProducto(idProducto);
    }
  };

  const procederCompra = () => {
    alert(
      `Procediendo a la compra de ${cantidadTotal} productos por un total de $${totalPrecio.toFixed(2)}`
    );
    // Aquí se deberia implementar la lógica de pago real.
  };

  return (
    <div className="carrito-container">
      <h2 className="carrito-titulo">Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <div className="carrito-vacio">
          <p>El carrito está vacío</p>
          <Link to="/productos">
            <button className="btn-continuar-comprando">
              Continuar comprando
            </button>
          </Link>
        </div>
      ) : (
        <>
          <div className="carrito-items">
            {carrito.map((item) => (
              <div key={item.id} className="carrito-item">
                <div className="item-info">
                  <h4 className="item-nombre">{item.nombre}</h4>
                  <p className="item-precio">
                    Precio unitario: ${Number(item.precio).toFixed(2)}
                  </p>
                  <p className="item-subtotal">
                    Subtotal: $
                    {(Number(item.precio) * (item.cantidad || 1)).toFixed(2)}
                  </p>
                </div>

                <div className="item-controles">
                  <div className="cantidad-controles">
                    <button
                      onClick={() => quitarCantidad(item.id)}
                      className="btn-cantidad btn-menos"
                    >
                      -
                    </button>
                    <span className="cantidad-display">
                      {item.cantidad || 1}
                    </span>
                    <button
                      onClick={() => aumentarCantidad(item.id)}
                      className="btn-cantidad btn-mas"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => manejarEliminarProducto(item.id)}
                    className="btn-eliminar"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="carrito-resumen">
            <h3>Total de productos: {cantidadTotal}</h3>
            <h3 className="total-pagar">
              Total a pagar: ${totalPrecio.toFixed(2)}
            </h3>
          </div>

          <div className="carrito-acciones">
            <Link to="/productos">
              <button className="btn-continuar-comprando">
                Continuar comprando
              </button>
            </Link>

            <div className="acciones-derecha">
              <button onClick={manejarVaciarCarrito} className="btn-vaciar">
                Vaciar Carrito
              </button>

              <button onClick={procederCompra} className="btn-comprar">
                Proceder a compra
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
