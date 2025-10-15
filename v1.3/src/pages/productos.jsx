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
    const [loading, setLoading] = useState(true);   // Controla el estado de carga de datos con la API dandole estado inicial true para que al iniciar el componente muestre el mensaje de cargando 
    const [error, setError] = useState(null);       // Maneja los errores de la API dandole estado inicial null para que no muestre ningun mensaje de error al iniciar el componente
                                                    // Si ocurre un error, se actualizará con un mensaje de error con setError

    // Función para manejar la adición al carrito
    const manejarAgregarCarrito = (producto) => {
        agregarAlCarrito(producto);
        // Opcional: mostrar una notificación o feedback al usuario
        alert(`${producto.nombre} agregado al carrito!`);
    };
    // useEffect para cargar los productos cuando el componente se monta
    useEffect(() => {
        // Función asíncrona para obtener los productos de la API
        // fetchProductos es una función que realiza una petición a la API para obtener los productos
        // y actualiza el estado del componente con los datos recibidos o maneja errores si ocurren
        const fetchProductos = async () => {
            try {
                // Realizar la petición a la API
                const response = await fetch("https://68d482fa214be68f8c696bbd.mockapi.io/api/productos");
                // Verificar si la respuesta es exitosa
                // Si la respuesta no es exitosa, lanzar un error con el estado HTTP correspondiente por ejemplo 404, 500, etc.
                // tipos de respuetas por ejemplo: 200 (OK), 201 (Created), 204 (No Content), 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 500 (Internal Server Error)
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                // if (!response.ok) se interpretar como: "si la respuesta no es correcta"
                // si es correcta continua con el flujo normal - si no es correcta lanza un error y salta al catch
                // Convertir la respuesta a JSON y actualizar el estado
                const data = await response.json();
                setProductos(Array.isArray(data) ? data : []); // Asegurarse de que data sea un array 
                // el formato de la declaración es: setProductos(data) o bien setProductos([]) si data no es un array
                // el signo de interrogación es un operador ternario que evalúa si data es un array
                // si es un array, devuelve data, si no es un array, devuelve un array vacío []
                // si devuelve un array vacío, el componente no mostrará ningún producto
                setError(null); // Limpiar cualquier error previo
                
            } catch (error) {
                console.error('Error al cargar productos:', error);
                // Actualizar el estado de error con un mensaje para el usuario tomando el numero de error del catch
                // console.error escribe el error en la consola del navegador para que podamos ver que sucedió
                setError(`Error al cargar los productos. Código de error: ${error.message}`);
                // setError actualiza el estado de error con un mensaje que se mostrará al usuario en la interfaz junto al número de error
                // funciona como un mensaje de alerta para el usuario.
                // se activa cuando ocurre un error en la petición a la API mediante fetch
                setProductos([]); // Limpiar productos en caso de error

            } finally {
                setLoading(false); // Indicar que la carga ha terminado
                // finally se ejecuta siempre, tanto si la petición fue exitosa como si hubo un error
                // se utiliza para asegurarse de que el estado de carga se actualice a false
                // lo seteamos a false porque la carga ha terminado, ya sea con éxito o con error de esta manera mostramos el mensaje de error o la lista de productos
            }
        };

        // Ejecutar la función de fetch
        fetchProductos();
        // El array vacío como segundo argumento de useEffect indica que este efecto solo se ejecuta una vez al montar el componente
        // la función fetchProductos se ejecuta solo una vez cuando el componente se monta.
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
                    // map requiere una key única para cada elemento renderizado que permite a React identificar qué ítems han cambiado, son agregados o eliminados
                    // Aquí usamos prod.id como key, asumiendo que cada producto tiene un ID único
                    <div key={prod.id} className="producto-card">
                        {/* Imagen del producto con manejo de errores */}
                        <img
                            src={prod.imagen ? encodeURI(prod.imagen) : 'https://placehold.co/400x300'}
                            //src usa encodeURI para manejar caracteres especiales en la URL de la imagen en caso de que la URL contenga espacios u otros caracteres especiales
                            alt={prod.nombre}
                            // alt nos da una descripción de la imagen que en caso de que la imagen no se cargue, el texto alternativo se mostrará en su lugar
                            className="producto-imagen"
                            onError={(e) => {
                                e.target.src = 'https://placehold.co/400x300';
                            }}
                            // onError maneja errores de carga de imagen, si la imagen no se carga correctamente, se reemplaza con una imagen por defecto
                            // se distingue si imagen da error o si no existe cuando es null o undefined y en ese momento se carga la imagen por defecto
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
                                className={`btn-agregar ${prod.stock <= 0 ? 'btn-disabled' : ''}`}
                                onClick={() => manejarAgregarCarrito(prod)}
                                disabled={prod.stock <= 0}
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