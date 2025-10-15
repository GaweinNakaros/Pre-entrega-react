/**
 * Componente DetalleProducto
 * Muestra la información detallada de un producto específico
 * Recibe los datos del producto a través del estado de la navegación
 */
import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import './productoDetalle.css';
import { useCarrito } from '../context/CarritoContext';

const DetalleProducto = () => {
    // Obtener el ID del producto de los parámetros de la URL
    const { id } = useParams();
    // Obtener el estado de la navegación que contiene los datos del producto
    const location = useLocation();
    // Extraer el producto del estado, usando optional chaining para evitar errores
    const producto = location.state?.prod;
    // Obtener funciones del contexto del carrito
    const { agregarAlCarrito } = useCarrito();

    // Función para manejar la adición al carrito
    const manejarAgregarCarrito = () => {
        agregarAlCarrito(producto);
        alert(`${producto.nombre} agregado al carrito!`);
    };

    // Renderizado condicional si no se encuentra el producto
    if (!producto) {
        return (
            <div className="mensaje-error">
                <h2>Producto no encontrado</h2>
                <Link to="/productos">
                    <button className="btn-volver">
                        Volver a productos
                    </button>
                </Link>
            </div>
        );
    }

    // Renderizado principal del detalle del producto
    return (
        <div className="detalle-container">
            <div className="detalle-content">
                {/* Imagen del producto con manejo de errores */}
                <img
                    src={producto.imagen ? encodeURI(producto.imagen) : 'https://placehold.co/400x300'}
                    alt={producto.nombre}
                    className="detalle-imagen"
                    onError={(e) => {
                        e.target.src = 'https://placehold.co/400x300';
                    }}
                />
                {/* Información detallada del producto */}
                <div className="detalle-info">
                    <h2>{producto.nombre}</h2>
                    <p className="detalle-descripcion">{producto.descripcion}</p>
                    {/* Precio formateado con dos decimales */}
                    <p className="detalle-precio">
                        ${parseFloat(producto.precio || 0).toFixed(2)}
                    </p>
                    {/* Información de stock */}
                    <p className={`detalle-stock ${producto.stock > 0 ? 'disponible' : 'agotado'}`}>
                        {producto.stock > 0 ? `Stock disponible: ${producto.stock}` : 'Sin stock'}
                    </p>
                    {/* Botones de acción */}
                    <div className="detalle-botones">
                        {/* Botón para volver a la lista de productos */}
                        <Link to="/productos" className="btn-link-secondary">
                            <button className="btn-volver">
                                Volver a productos
                            </button>
                        </Link>
                        {/* Botón para agregar al carrito */}
                        <button 
                            className={`btn-comprar ${producto.stock <= 0 ? 'btn-disabled' : ''}`}
                            onClick={manejarAgregarCarrito}
                            disabled={producto.stock <= 0}
                        >
                            {producto.stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetalleProducto;