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
            <div className="container py-4">
                <div className="alert alert-warning" role="alert">
                    Producto no encontrado
                </div>
                <Link to="/productos" className="btn btn-secondary">
                    Volver a productos
                </Link>
            </div>
        );
    }

    // Renderizado principal del detalle del producto
    return (
        <div className="container py-4">
            <div className="row g-4">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <img
                            src={producto.imagen ? encodeURI(producto.imagen) : 'https://placehold.co/600x400'}
                            alt={producto.nombre}
                            className="card-img-top"
                            onError={(e) => { e.target.src = 'https://placehold.co/600x400'; }}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body d-flex flex-column">
                            <h2 className="card-title mb-2">{producto.nombre}</h2>
                            <p className="text-muted text-uppercase small mb-2">{producto.categoria}</p>
                            <p className="card-text mb-3">{producto.descripcion}</p>
                            <div className="d-flex align-items-center gap-3 mb-3">
                                <span className="badge bg-primary fs-6">${parseFloat(producto.precio || 0).toFixed(2)}</span>
                                <span className={`badge ${producto.stock > 0 ? 'bg-success' : 'bg-secondary'}`}>
                                    {producto.stock > 0 ? `Stock: ${producto.stock}` : 'Sin stock'}
                                </span>
                            </div>
                            <div className="d-flex gap-2 mt-auto">
                                <Link to="/productos" className="btn btn-secondary">Volver a productos</Link>
                                <button
                                    className="btn btn-primary"
                                    onClick={manejarAgregarCarrito}
                                    disabled={producto.stock <= 0}
                                >
                                    {producto.stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetalleProducto;