import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./inicio.css";
import { useCategorias } from "../context/CategoriasContext";

function Inicio() {
  const navigate = useNavigate();
  
  // Obtener categorías del contexto global
  const { categorias, loading: loadingCategorias } = useCategorias();
  
  // Estado para el slider automático
  const [slideActual, setSlideActual] = useState(0);
  const [slideAnterior, setSlideAnterior] = useState(null);
  
  // Estado para el slider de categorías
  const [desplazamientoCategoria, setDesplazamientoCategoria] = useState(0);
  const [categoriasVisibles, setCategoriasVisibles] = useState(6);
  const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);

  // Ajustar categorías visibles según tamaño de pantalla
  useEffect(() => {
    const ajustarCategoriasVisibles = () => {
      const ancho = window.innerWidth; // Obtener ancho actual de la ventana
      setAnchoPantalla(ancho);
      
      const anchoCategoria = ancho <= 480 ? 75 : ancho <= 768 ? 85 : 100;
      const gapCategoria = ancho <= 480 ? 7 : ancho <= 768 ? 8 : 10;
      const paddingLateral = ancho <= 480 ? 40 : ancho <= 768 ? 60 : 100; // 2x padding (flechas)
      
      const anchoDisponible = ancho - paddingLateral;
      const anchoConGap = anchoCategoria + gapCategoria;
      const categoriasQueCaben = Math.floor((anchoDisponible + gapCategoria) / anchoConGap);
      
      setCategoriasVisibles(Math.max(3, categoriasQueCaben));
      // Reset desplazamiento al cambiar tamaño
      setDesplazamientoCategoria(0);
    };

    ajustarCategoriasVisibles();
    window.addEventListener('resize', ajustarCategoriasVisibles);
    
    return () => window.removeEventListener('resize', ajustarCategoriasVisibles);
  }, []);
  
  // Array de slides (por ahora con placeholders)
  // Para agregar imágenes: { id: 1, titulo: "Título", descripcion: "Texto", imagen: "/ruta/imagen.jpg" }
  const slides = [
    { id: 1, titulo: "Slide 1", descripcion: "Descripción del slide 1", imagen: null },
    { id: 2, titulo: "Slide 2", descripcion: "Descripción del slide 2", imagen: null },
    { id: 3, titulo: "Slide 3", descripcion: "Descripción del slide 3", imagen: null }
  ];
  
  // Efecto para cambiar slides automáticamente cada 5 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      setSlideActual((prev) => {
        setSlideAnterior(prev);
        return (prev + 1) % slides.length;
      });
    }, 5000);
    
    return () => clearInterval(intervalo);
  }, [slides.length]);
  
  // Función para navegar a una categoría
  const manejarClickCategoria = (nombreCategoria) => {
    navigate(`/productos?categoria=${encodeURIComponent(nombreCategoria)}`);
  };
  
  // Función para cambiar slide manualmente
  const cambiarSlide = (indice) => {
    setSlideAnterior(slideActual);
    setSlideActual(indice);
  };

  // Funciones para navegar en el slider de categorías
  const avanzarCategorias = () => {
    const maxDesplazamiento = Math.max(0, categorias.length - categoriasVisibles);
    setDesplazamientoCategoria(prev => Math.min(prev + 1, maxDesplazamiento));
  };

  const retrocederCategorias = () => {
    setDesplazamientoCategoria(prev => Math.max(prev - 1, 0));
  };

  // Calcular desplazamiento en píxeles según tamaño de pantalla
  const anchoCategoria = anchoPantalla <= 480 ? 75 : anchoPantalla <= 768 ? 85 : 100;
  const gapCategoria = anchoPantalla <= 480 ? 7 : anchoPantalla <= 768 ? 8 : 10;
  const desplazamientoPixeles = desplazamientoCategoria * (anchoCategoria + gapCategoria);

  // Verificar si hay desbordamiento y se necesitan flechas
  const hayDesbordamiento = categorias.length > categoriasVisibles;
  const mostrarFlechaIzquierda = hayDesbordamiento && desplazamientoCategoria > 0;
  const mostrarFlechaDerecha = hayDesbordamiento && desplazamientoCategoria < categorias.length - categoriasVisibles;

  return (
    <div className="inicio-container">
      {/* Sección de Promociones Destacadas */}
      <section className="promociones-section">
        <div className="promociones-container">
          <div className="promo-card promo-destacada">
            <h3>Envío Gratis</h3>
            <p>En compras mayores a $50</p>
          </div>
          <div className="promo-card">
            <h3>10% OFF</h3>
            <p>Primera compra</p>
          </div>
          <div className="promo-card">
            <h3>Cuotas sin interés</h3>
            <p>Hasta 12 cuotas</p>
          </div>
        </div>
      </section>

      {/* Banner con Slider Automático */}
      <section className="banner-slider">
        <div className="slider-contenido">
          {slides.map((slide, index) => {
            // Determinar la clase del slide basado en su posición
            let claseSlide = "slide";
            
            if (index === slideActual) {
              // Slide activo (centro)
              claseSlide += " activo";
            } else if (index === slideAnterior) {
              // Slide que acaba de salir (sale por la izquierda)
              claseSlide += " anterior";
            }
            // Los demás slides permanecen a la derecha (fuera de vista)
            
            return (
              <div key={slide.id} className={claseSlide}>
                {/* Si el slide tiene imagen, mostrar la imagen; si no, mostrar placeholder */}
                {slide.imagen ? (
                  <>
                    <img src={slide.imagen} alt={slide.titulo} />
                    {/* Contenido de texto superpuesto sobre la imagen */}
                    <div className="slide-contenido-texto">
                      <h2>{slide.titulo}</h2>
                      <p>{slide.descripcion}</p>
                    </div>
                  </>
                ) : (
                  // Placeholder sin imagen
                  <div className="slide-placeholder">
                    <h2>{slide.titulo}</h2>
                    <p>{slide.descripcion}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Indicadores de slides */}
        <div className="slider-indicadores">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicador ${index === slideActual ? "activo" : ""}`}
              onClick={() => cambiarSlide(index)}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
      
      {/* Iconos de Categorías */}
      <section className="categorias-section">
        <h2 className="categorias-titulo">Categorías</h2>
        {loadingCategorias ? (
          <p style={{ textAlign: 'center' }}>Cargando categorías...</p>
        ) : (
          <div className={`categorias-slider-container ${!hayDesbordamiento ? 'sin-flechas' : ''}`}>
            {/* Flecha izquierda */}
            {mostrarFlechaIzquierda && (
              <button 
                className="categoria-flecha categoria-flecha-izq"
                onClick={retrocederCategorias}
                aria-label="Ver categorías anteriores"
              >
                ‹
              </button>
            )}
            
            {/* Grid de categorías con desplazamiento */}
            <div className="categorias-grid-wrapper">
              <div 
                className="categorias-grid"
                style={{
                  transform: hayDesbordamiento ? `translateX(-${desplazamientoPixeles}px)` : 'none'
                }}
              >
                {categorias.map((categoria) => (
                  <div
                    key={categoria.id}
                    className="categoria-icono"
                    onClick={() => manejarClickCategoria(categoria.nombre)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") manejarClickCategoria(categoria.nombre);
                    }}
                  >
                    <div className="icono-placeholder">
                      {/* Si tiene imagen, mostrar la imagen; si no, mostrar la inicial */}
                      {categoria.icono ? (
                        <img src={categoria.icono} alt={categoria.nombre} />
                      ) : (
                        <span className="icono-texto">{categoria.nombre[0]}</span>
                      )}
                    </div>
                    <p className="categoria-nombre">{categoria.nombre}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Flecha derecha */}
            {mostrarFlechaDerecha && (
              <button 
                className="categoria-flecha categoria-flecha-der"
                onClick={avanzarCategorias}
                aria-label="Ver más categorías"
              >
                ›
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default Inicio;