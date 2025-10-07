import React, { useState, useEffect } from 'react';
import './CarritoCompras.css';

/**
 * Componente CarritoCompras
 * Maneja la lógica del carrito de compras de forma independiente
 * Puede ser reutilizado en múltiples páginas
 */
function CarritoCompras({ className = "" }) {
  // Estados del carrito
  const [isVisible, setIsVisible] = useState(false);
  const [itemsCarrito, setItemsCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  // Efecto para calcular el total cuando cambian los items
  useEffect(() => {
    const nuevoTotal = itemsCarrito.reduce((acc, item) => {
      return acc + (parseFloat(item.precio) * item.cantidad);
    }, 0);
    setTotal(nuevoTotal);
  }, [itemsCarrito]);

  // Función para agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    setItemsCarrito(prevItems => {
      const itemExistente = prevItems.find(item => item.id === producto.id);
      
      if (itemExistente) {
        // Si ya existe, aumentar cantidad
        return prevItems.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        // Si no existe, agregarlo con cantidad 1
        return [...prevItems, { ...producto, cantidad: 1 }];
      }
    });
  };

  // Función para eliminar producto del carrito
  const eliminarDelCarrito = (productId) => {
    setItemsCarrito(prevItems => 
      prevItems.filter(item => item.id !== productId)
    );
  };

  // Función para modificar cantidad
  const modificarCantidad = (productId, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(productId);
      return;
    }

    setItemsCarrito(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, cantidad: nuevaCantidad }
          : item
      )
    );
  };

  // Función para vaciar carrito
  const vaciarCarrito = () => {
    setItemsCarrito([]);
  };

  // Exponer funciones para uso externo (opcional)
  // Esto permite que otros componentes agreguen productos
  React.useImperativeHandle(React.forwardRef(() => null), () => ({
    agregarAlCarrito,
    vaciarCarrito,
    itemsCarrito,
    total
  }));

  return (
    <div className={`carrito-wrapper ${className}`}>
      {/* Icono del carrito */}
      <div 
        className="carrito-icon"
        onClick={() => setIsVisible(!isVisible)}
        title="Ver carrito de compras"
      >
        🛒
        {itemsCarrito.length > 0 && (
          <span className="carrito-badge">
            {itemsCarrito.reduce((acc, item) => acc + item.cantidad, 0)}
          </span>
        )}
      </div>

      {/* Card del carrito */}
      {isVisible && (
        <div className="carrito-card">
          <div className="carrito-header">
            <h3>Carrito de Compras</h3>
            <button 
              className="cerrar-carrito"
              onClick={() => setIsVisible(false)}
            >
              ✕
            </button>
          </div>

          <div className="carrito-content">
            {itemsCarrito.length === 0 ? (
              <p className="carrito-vacio">No hay productos en el carrito.</p>
            ) : (
              <>
                <div className="carrito-items">
                  {itemsCarrito.map((item) => (
                    <div key={item.id} className="carrito-item">
                      <div className="item-info">
                        <h4>{item.nombre}</h4>
                        <p className="item-precio">
                          ${parseFloat(item.precio).toFixed(2)}
                        </p>
                      </div>
                      
                      <div className="item-controls">
                        <button
                          className="cantidad-btn"
                          onClick={() => modificarCantidad(item.id, item.cantidad - 1)}
                        >
                          -
                        </button>
                        <span className="cantidad">{item.cantidad}</span>
                        <button
                          className="cantidad-btn"
                          onClick={() => modificarCantidad(item.id, item.cantidad + 1)}
                        >
                          +
                        </button>
                        <button
                          className="eliminar-btn"
                          onClick={() => eliminarDelCarrito(item.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="carrito-footer">
                  <div className="carrito-total">
                    <strong>Total: ${total.toFixed(2)}</strong>
                  </div>
                  <div className="carrito-acciones">
                    <button 
                      className="btn-vaciar"
                      onClick={vaciarCarrito}
                    >
                      Vaciar Carrito
                    </button>
                    <button className="btn-comprar">
                      Finalizar Compra
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CarritoCompras;