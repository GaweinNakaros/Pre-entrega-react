import React, { createContext, useContext, useState } from 'react';

// Crear el contexto del carrito
const CarritoContext = createContext();

// Hook personalizado para usar el contexto del carrito
export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
  }
  return context;
};

/**
 * Proveedor del contexto del carrito
 * Contiene toda la lógica de negocio relacionada con el carrito de compras
 */
export const CarritoProvider = ({ children }) => {
  // Estado del carrito
  const [carrito, setCarrito] = useState([]);

  // Función para agregar productos al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito(carritoActual => {
      const productoExistente = carritoActual.find(item => item.id === producto.id);
      
      if (productoExistente) {
        // Si el producto ya existe, aumentar la cantidad
        return carritoActual.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: (item.cantidad || 1) + 1 }
            : item
        );
      } else {
        // Si es un producto nuevo, agregarlo al carrito
        return [...carritoActual, { ...producto, cantidad: 1 }];
      }
    });
  };

  // Función para quitar cantidad de un producto
  const quitarCantidad = (idProducto) => {
    setCarrito(carritoActual => {
      return carritoActual.map(producto => {
        if (producto.id === idProducto) {
          const cantidadActual = producto.cantidad || 1;
          if (cantidadActual === 1) {
            return null; // Marcar para eliminar
          }
          return { ...producto, cantidad: cantidadActual - 1 };
        }
        return producto;
      }).filter(producto => producto !== null);
    });
  };

  // Función para aumentar cantidad de un producto
  const aumentarCantidad = (idProducto) => {
    setCarrito(carritoActual => {
      return carritoActual.map(producto => {
        if (producto.id === idProducto) {
          return {
            ...producto,
            cantidad: (producto.cantidad || 1) + 1
          };
        }
        return producto;
      });
    });
  };

  // Función para eliminar un producto completamente del carrito
  const eliminarProducto = (idProducto) => {
    setCarrito(carritoActual => 
      carritoActual.filter(producto => producto.id !== idProducto)
    );
  };

  // Función para vaciar el carrito completo
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // Función para obtener la cantidad total de productos
  const obtenerCantidadTotal = () => {
    return carrito.reduce((total, item) => total + (item.cantidad || 1), 0);
  };

  // Función para obtener el total del precio
  const obtenerTotalPrecio = () => {
    return carrito.reduce((sum, item) => {
      const cantidad = item.cantidad || 1;
      return sum + (Number(item.precio) * cantidad);
    }, 0);
  };

  // Función para verificar si un producto está en el carrito
  const estaEnCarrito = (idProducto) => {
    return carrito.some(item => item.id === idProducto);
  };

  // Función para obtener la cantidad de un producto específico
  const obtenerCantidadProducto = (idProducto) => {
    const producto = carrito.find(item => item.id === idProducto);
    return producto ? producto.cantidad || 1 : 0;
  };

  // Valores que se proporcionan a través del contexto
  const contextValue = {
    // Estado
    carrito,
    setCarrito,
    
    // Funciones principales
    agregarAlCarrito,
    quitarCantidad,
    aumentarCantidad,
    eliminarProducto,
    vaciarCarrito,
    
    // Funciones de consulta
    obtenerCantidadTotal,
    obtenerTotalPrecio,
    estaEnCarrito,
    obtenerCantidadProducto,
    
    // Propiedades computadas para fácil acceso
    cantidadTotal: obtenerCantidadTotal(),
    totalPrecio: obtenerTotalPrecio(),
    estaVacio: carrito.length === 0
  };

  return (
    <CarritoContext.Provider value={contextValue}>
      {children}
    </CarritoContext.Provider>
  );
};