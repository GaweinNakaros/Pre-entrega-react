import React, { createContext, useContext, useState } from 'react';

// Crear el contexto del carrito
const CarritoContext = createContext();

// Hook del carrito
// hook es una función que permite usar características de React como el estado y el ciclo de vida en componentes funcionales
// useContext es un hook que permite acceder al valor del contexto en componentes funcionales
// este hook facilita el acceso al contexto del carrito en cualquier componente funcional
// el contexto proporciona el estado del carrito y las funciones para manipularlo
// de esta forma, cualquier componente que use este hook puede interactuar con el carrito de compras

// Lanza un error si se usa fuera del 
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
        // spread es una forma de copiar un objeto o array en uno nuevo para manipularlo sin afectar el original y aplicar los cambios deseados
        // spread es la sintaxis de 3 puntos (...) para copiar las propiedades del objeto y despues de la coma se indica la propiedad que se quiere modificar
        // Si el producto ya existe, aumentar la cantidad
        // Si no tiene cantidad, asumir 1
        return carritoActual.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: (item.cantidad || 1) + 1 } // usamos el operador OR para manejar la cantidad indefinida en caso de que sea un producto recién agregado
            : item
        );
      } else {
        // Si es un producto nuevo, agregarlo al carrito
        return [...carritoActual, { ...producto, cantidad: 1 }]; // inicializamos la cantidad en 1 al agregar un nuevo producto tomando de referencia el producto completo, y el atributo cantidad
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
  // .reduce es un método de array que acumula un valor basado en una función que se aplica a cada elemento del array
  // en este caso usamos reduce con total como acumulador y item como el elemento actual del array
  // me permite calcular la cantidad total de productos en el carrito sumando las cantidades de cada producto

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
  // some es un método de array que verifica si al menos un elemento cumple con una condición
  // en este caso usamos some para verificar si algún item del carrito tiene el mismo id que el idProducto proporcionado
  // me permite saber si un producto específico ya está en el carrito de compras
  const estaEnCarrito = (idProducto) => {
    return carrito.some(item => item.id === idProducto);
  };

  // Función para obtener la cantidad de un producto específico
  // find es un método de array que busca un elemento que cumpla con una condición y devuelve el primer elemento que la cumple o undefined si no lo encuentra
  // en este caso usamos find para buscar un item del carrito que tenga el mismo id que el idProducto proporcionado
  // me permite obtener la cantidad de un producto específico en el carrito, devolviendo 0 si no está presente
  const obtenerCantidadProducto = (idProducto) => {
    const producto = carrito.find(item => item.id === idProducto);
    // usamos el operador ? para verificar si producto no es undefined (es decir, si se encontró el producto en el carrito)
    // si producto es undefined, retornamos 0
    // si producto existe, retornamos su cantidad o 1 si no tiene cantidad definida
    return producto ? producto.cantidad || 1 : 0;
  };

  // Valores que se proporcionan a través del contexto
  // Exponemos tanto el estado del carrito como las funciones para manipularlo y consultarlo
  // Esto permite que cualquier componente que consuma este contexto pueda interactuar con el carrito de compras de manera completa y sencilla
  const contextValue = {
    // Estado
    carrito,
    setCarrito, // esta función viene de useState y permite actualizar el estado del carrito directamente si es necesario
    
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
    
    // Propiedades que se pueden llamar directamente para facilitar su uso
    cantidadTotal: obtenerCantidadTotal(),
    totalPrecio: obtenerTotalPrecio(),
    estaVacio: carrito.length === 0
  };

  return (
    // la sintaxis Provider es un componente especial que viene con createContext y permite compartir el valor del contexto con todos los componentes hijos que lo consumen
    // el atributo value es donde se pasa el valor que se quiere compartir, en este caso contextValue que contiene el estado del carrito y las funciones para manipularlo
    <CarritoContext.Provider value={contextValue}>
      {children}
    </CarritoContext.Provider>
  );
};