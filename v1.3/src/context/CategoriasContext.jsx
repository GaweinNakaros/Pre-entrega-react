import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto de categorías
const CategoriasContext = createContext();

/**
 * Hook para usar el contexto de categorías
 * Facilita el acceso a las categorías en cualquier componente
 */
export const useCategorias = () => {
  const context = useContext(CategoriasContext);
  if (!context) {
    throw new Error('useCategorias debe ser usado dentro de un CategoriasProvider');
  }
  return context;
};

/**
 * Proveedor del contexto de categorías
 * Obtiene las categorías únicas desde MockAPI y las comparte globalmente
 */
export const CategoriasProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Diccionario de traducción de categorías inglés -> español
  const traduccionCategorias = {
    'Electronics': 'Electrónica',
    'Clothing': 'Ropa',
    'Home': 'Hogar',
    'Sports': 'Deportes',
    'Toys': 'Juguetes',
    'Books': 'Libros',
    'Health': 'Salud',
    'Beauty': 'Belleza',
    'Automotive': 'Automotriz',
    'Garden': 'Jardín',
    'Tools': 'Herramientas',
    'Baby': 'Bebé',
    'Kids': 'Niños',
    'Music': 'Música',
    'Movies': 'Películas',
    'Games': 'Juegos',
    'Grocery': 'Alimentos',
    'Shoes': 'Calzado',
    'Jewelry': 'Joyería',
    'Outdoors': 'Exteriores',
    'Industrial': 'Industrial',
    'Computers': 'Computación'
  };

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        // Obtener todos los productos de MockAPI
        const response = await fetch("https://68d482fa214be68f8c696bbd.mockapi.io/api/productos");
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const productos = await response.json();
        
        // Extraer categorías únicas y traducirlas
        const categoriasUnicas = [...new Set(productos.map(prod => {
          const categoriaOriginal = prod.categoria;
          // Traducir si existe en el diccionario, si no usar original
          return traduccionCategorias[categoriaOriginal] || categoriaOriginal || 'Sin categoría';
        }))];
        
        // Ordenar alfabéticamente
        categoriasUnicas.sort();
        
        // Crear objetos de categoría con id, nombre e icono
        const categoriasConDatos = categoriasUnicas.map((cat, index) => ({
          id: index + 1,
          nombre: cat,
          icono: null // Placeholder para futuras imágenes
        }));
        
        setCategorias(categoriasConDatos);
        setError(null);
        
      } catch (error) {
        console.error('Error al cargar categorías:', error);
        setError(error.message);
        setCategorias([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  const contextValue = {
    categorias,
    loading,
    error,
    traduccionCategorias // Exportar también el diccionario para uso en otros componentes
  };

  return (
    <CategoriasContext.Provider value={contextValue}>
      {children}
    </CategoriasContext.Provider>
  );
};
