// Importación de dependencias necesarias de React y React Router
import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { Link, useSearchParams } from "react-router-dom";
// Importación de estilos
import './productos.css';
// Importar el contexto del carrito y categorías
import { useCarrito } from '../context/CarritoContext';
import { useCategorias } from '../context/CategoriasContext';
import { useApi } from '../context/ApiContext';

/**
 * Componente Productos
 * Muestra una lista de productos en un diseño de cuadrícula
 * Incluye manejo de estados de carga y errores
 */
function Productos() {
    // Obtener funciones del contexto del carrito
    const { agregarAlCarrito } = useCarrito();
    
    // Obtener diccionario de traducción del contexto de categorías
    const { traduccionCategorias } = useCategorias();
    const { getProductos } = useApi();
    
    // Hook para leer parámetros de la URL (query params)
    const [searchParams] = useSearchParams();
    const categoriaFiltro = searchParams.get('categoria'); // Obtener ?categoria=xxx de la URL
    
    // Estados para manejar los productos y el estado de la aplicación
    const [productos, setProductos] = useState([]); // Almacena la lista de productos
    const [loading, setLoading] = useState(true);   // Controla el estado de carga de datos de la API
    const [error, setError] = useState(null);       // Maneja los errores de la API

    // Función para manejar la adición al carrito
    const manejarAgregarCarrito = (producto) => {
        // Verificar que el producto tenga stock disponible
        if (!producto.stock || producto.stock <= 0) {
            toast.warn('Este producto no tiene stock disponible');
            return;
        }
        agregarAlCarrito(producto);
        toast.success(`${producto.nombre} agregado al carrito`);
    };
    // useEffect para cargar los productos cuando el componente se monta
    useEffect(() => {
        // Función asíncrona para obtener los productos de la API
        const fetchProductos = async () => {
            try {
                const productosNormalizados = await getProductos(traduccionCategorias);
                setProductos(productosNormalizados);
                setError(null);
            } catch (error) {
                console.error('Error al cargar productos:', error);
                setError(`Error al cargar los productos. Código de error: ${error.message}`);
                setProductos([]);
            } finally {
                setLoading(false);
            }
        };

        // Ejecutar la función de fetch
        fetchProductos();
    }, []); 
    
    // Filtrar productos por categoría si existe el parámetro en la URL
    const productosFiltrados = categoriaFiltro 
        ? productos.filter(prod => prod.categoria === categoriaFiltro)
        : productos;

    // Renderizado condicional para el estado de carga
    if (loading) {
        return (
            <div className="container py-4">
                <h2>Nuestros Productos</h2>
                <p>Cargando productos...</p>
            </div>
        );
    }

    // Renderizado condicional para el estado de error
    if (error) {
        return (
            <div className="container py-4">
                <h2>Nuestros Productos</h2>
                <div className="alert alert-danger" role="alert">{error}</div>
            </div>
        );
    }

    // Renderizado principal de la lista de productos
    return (
        <div className="container py-4" role="main" aria-labelledby="titulo-productos">
            <Helmet>
              <title>Catálogo de Productos</title>
              <meta name="description" content="Explora nuestro catálogo de productos disponibles por categoría." />
            </Helmet>
            <h2 id="titulo-productos">
                {categoriaFiltro 
                    ? `Productos - ${categoriaFiltro}` 
                    : 'Nuestros Productos'}
            </h2>
            {/* Mostrar mensaje si no hay productos en la categoría */}
            {productosFiltrados.length === 0 && !loading && !error ? (
                <div className="my-3">
                    <div className="alert alert-info" role="alert">No hay productos disponibles en esta categoría.</div>
                    <Link to="/productos" className="btn btn-secondary">Ver todos los productos</Link>
                </div>
            ) : (
                <div className="row g-4">
                    {/* Mapear cada producto a una tarjeta */}
                    {productosFiltrados.map((prod) => (
                    // map requiere una key única para cada elemento renderizado
                    <div key={prod.id} className="col-sm-6 col-md-4 col-lg-3">
                        <div className="card h-100 shadow-sm">
                            <img
                                src={prod.imagen ? encodeURI(prod.imagen) : 'https://placehold.co/400x300'}
                                alt={prod.nombre}
                                className="card-img-top"
                                onError={(e) => { e.target.src = 'https://placehold.co/400x300'; }}
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title mb-2">{prod.nombre}</h5>
                                <p className="text-muted text-uppercase small mb-2">{prod.categoria}</p>
                                <p className="card-text flex-grow-1 mb-3">{prod.descripcion}</p>
                                <div className="d-flex align-items-center gap-2 mb-3">
                                    <span className="badge bg-primary">${parseFloat(prod.precio || 0).toFixed(2)}</span>
                                    <span className={`badge ${prod.stock > 0 ? 'bg-success' : 'bg-secondary'}`}>
                                        {prod.stock > 0 ? `Stock: ${prod.stock}` : 'Sin stock'}
                                    </span>
                                </div>
                                <div className="d-flex gap-2 mt-auto">
                                    <Link to={`/productos/${prod.id}`} state={{prod}} className="btn btn-outline-primary">
                                        Ver detalles
                                    </Link>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => manejarAgregarCarrito(prod)}
                                        disabled={!prod.stock || prod.stock <= 0}
                                    >
                                        {prod.stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            )}
        </div>
    );
}

export default Productos;