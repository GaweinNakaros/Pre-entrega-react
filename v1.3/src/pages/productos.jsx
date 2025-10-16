// Importación de dependencias necesarias de React y React Router
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Importación de estilos
import './productos.css';
// Importar el contexto del carrito
import { useCarrito } from '../context/CarritoContext';

/**
 * Componente Productos
 * Muestra una lista de productos en un diseño de cuadrícula
 * Incluye manejo de estados de carga y errores
 */
function Productos() {
    // Obtener funciones del contexto del carrito
    const { agregarAlCarrito } = useCarrito();
    
    // Estados para manejar los productos y el estado de la aplicación
    const [productos, setProductos] = useState([]); // Almacena la lista de productos
    const [loading, setLoading] = useState(true);   // Controla el estado de carga de datos de la API
    const [error, setError] = useState(null);       // Maneja los errores de la API

    // Función para manejar la adición al carrito
    const manejarAgregarCarrito = (producto) => {
        // Verificar que el producto tenga stock disponible
        if (!producto.stock || producto.stock <= 0) {
            alert('Este producto no tiene stock disponible');
            return; // Salir de la función sin agregar al carrito
        }
        
        agregarAlCarrito(producto);
        // Opcional: mostrar una notificación o feedback al usuario
        alert(`${producto.nombre} agregado al carrito!`);
    };
    // useEffect para cargar los productos cuando el componente se monta
    useEffect(() => {
        // Función asíncrona para obtener los productos de la API
        const fetchProductos = async () => {
            try {
                // Realizar la petición a la API
                const response = await fetch("https://68d482fa214be68f8c696bbd.mockapi.io/api/productos");
                // Verificar si la respuesta es exitosa
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                // Convertir la respuesta a JSON y actualizar el estado
                const data = await response.json();
                
                // Agregar stock a cada producto con distribución 50/50 para pruebas
                // Este enfoque permite probar tanto productos disponibles como agotados
                // 50% de productos tendrán stock 0 (sin stock - para probar botón deshabilitado)
                // 50% de productos tendrán stock entre 1 y 10 (con stock - para probar agregar al carrito)
                const productosConStock = data.map(producto => ({
                    ...producto, // Spread operator (...) - copia todas las propiedades originales del producto
                    // Lógica de asignación de stock con operador ternario
                    // Math.random() genera un número aleatorio entre 0 (incluido) y 1 (excluido)
                    // Si Math.random() < 0.5 (50% de probabilidad) → asigna 0 (sin stock)
                    // Si Math.random() >= 0.5 (50% de probabilidad) → asigna stock entre 1 y 10
                    stock: Math.random() < 0.5 
                        ? 0  // Sin stock - permitirá probar el botón deshabilitado y mensaje "Sin stock"
                        : Math.floor(Math.random() * 10) + 1
                        // Con stock entre 1-10:
                        // Math.random() * 10 genera número entre 0 y 9.999
                        // Math.floor() redondea hacia abajo, dando números entre 0 y 9
                        // +1 convierte el rango de 0-9 a 1-10 (evitando 0 en este caso)
                        // Resultado final: números enteros del 1 al 10
                }));
                
                setProductos(productosConStock);
                setError(null); // Limpiar cualquier error previo
                
            } catch (error) {
                console.error('Error al cargar productos:', error);
                setError(`Error al cargar los productos. Código de error: ${error.message}`);
                setProductos([]); // Limpiar productos en caso de error

            } finally {
                setLoading(false); // Indicar que la carga ha terminado
            }
        };

        // Ejecutar la función de fetch
        fetchProductos();
    }, []); 

    // Renderizado condicional para el estado de carga
    if (loading) {
        return (
            <div className="productos-container">
                <h2>Nuestros Productos</h2>
                <p>Cargando productos...</p>
            </div>
        );
    }

    // Renderizado condicional para el estado de error
    if (error) {
        return (
            <div className="productos-container">
                <h2>Nuestros Productos</h2>
                <p style={{ color: 'red' }}>{error}</p>
            </div>
        );
    }

    // Renderizado principal de la lista de productos
    return (
        <div className="productos-container">
            <h2>Nuestros Productos</h2>
            <div className="productos-grid">
                {/* Mapear cada producto a una tarjeta */}
                {productos.map((prod) => (
                    // map requiere una key única para cada elemento renderizado
                    <div key={prod.id} className="producto-card">
                        {/* Imagen del producto con manejo de errores */}
                        <img
                            src={prod.imagen ? encodeURI(prod.imagen) : 'https://placehold.co/400x300'}
                            alt={prod.nombre}
                            className="producto-imagen"
                            onError={(e) => {
                                e.target.src = 'https://placehold.co/400x300';
                            }}
                        />
                        {/* Información del producto */}
                        <h3>{prod.nombre}</h3>
                        <p>{prod.descripcion}</p>
                        {/* Sección de precio y stock */}
                        <div className="producto-detalles">
                            {/*con producto-detalles armo un contenedor para el precio y el stock, la etiqueta <span> es un elemento que se utiliza para agrupar contenido en línea y aplicar estilos*/}
                            <span className="precio">
                                ${parseFloat(prod.precio || 0).toFixed(2)}
                            </span>
                            <span className={`stock ${prod.stock > 0 ? 'stock-disponible' : 'stock-agotado'}`}>
                                {prod.stock > 0 ? `Stock: ${prod.stock}` : 'Sin stock'}
                            </span>
                        </div>
                        {/* Botones de acción del producto */}
                        <div className="producto-botones">
                            {/* Enlace a los detalles del producto */}
                            <Link to={`/productos/${prod.id}`} state={{prod}} className="btn-link">
                                <button className="btn-detalle">
                                    Ver detalles
                                </button>
                            </Link>
                            {/* Botón para agregar al carrito */}
                            <button 
                                className={`btn-agregar ${(!prod.stock || prod.stock <= 0) ? 'btn-disabled' : ''}`}
                                onClick={() => manejarAgregarCarrito(prod)}
                                disabled={!prod.stock || prod.stock <= 0}
                            >
                                {prod.stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Productos;