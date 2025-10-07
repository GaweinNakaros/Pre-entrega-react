/**
 * Componente DetalleProducto
 * Muestra la información detallada de un producto específico
 * Recibe los datos del producto a través del estado de la navegación
 */
import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import './productoDetalle.css';

const DetalleProducto = () => {
    // Obtener el ID del producto de los parámetros de la URL
    const { id } = useParams();
    // Obtener el estado de la navegación que contiene los datos del producto
    const location = useLocation();
    // Extraer el producto del estado, usando optional chaining para evitar errores
    const producto = location.state?.prod;

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
                    {/* Botón para volver a la lista de productos */}
                    <Link to="/productos">
                        <button className="btn-volver">
                            Volver a productos
                        </button>
                    </Link>
                    {/* Botón de compra */}
                    <button className="btn-comprar">Comprar</button>
                </div>
            </div>
        </div>
    );
};

export default DetalleProducto;