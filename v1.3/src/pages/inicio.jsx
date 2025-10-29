import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./inicio.css";

function Inicio() {
  const navigate = useNavigate();
  
  // Estado para el slider automático
  const [slideActual, setSlideActual] = useState(0);
  
  // Array de slides (por ahora con placeholders)
  // Para agregar imágenes: { id: 1, titulo: "Título", descripcion: "Texto", imagen: "/ruta/imagen.jpg" }
  const slides = [
    { id: 1, titulo: "Slide 1", descripcion: "Descripción del slide 1", imagen: null },
    { id: 2, titulo: "Slide 2", descripcion: "Descripción del slide 2", imagen: null },
    { id: 3, titulo: "Slide 3", descripcion: "Descripción del slide 3", imagen: null }
  ];
  
  // Array de categorías con iconos placeholder
  // Para agregar imágenes: { id: 1, nombre: "Electrónica", icono: "/ruta/icono.png", ruta: "..." }
  const categorias = [
    { id: 1, nombre: "Electrónica", icono: null, ruta: "/productos?categoria=electronica" },
    { id: 2, nombre: "Ropa", icono: null, ruta: "/productos?categoria=ropa" },
    { id: 3, nombre: "Hogar", icono: null, ruta: "/productos?categoria=hogar" },
    { id: 4, nombre: "Deportes", icono: null, ruta: "/productos?categoria=deportes" },
    { id: 5, nombre: "Juguetes", icono: null, ruta: "/productos?categoria=juguetes" },
    { id: 6, nombre: "Libros", icono: null, ruta: "/productos?categoria=libros" }
  ];
  
  // Efecto para cambiar slides automáticamente cada 5 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      setSlideActual((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(intervalo);
  }, [slides.length]);
  
  // Función para navegar a una categoría
  const manejarClickCategoria = (ruta) => {
    navigate(ruta);
  };
  
  // Función para cambiar slide manualmente
  const cambiarSlide = (indice) => {
    setSlideActual(indice);
  };

  return (
    <div className="inicio-container">
      {/* Banner con Slider Automático */}
      <section className="banner-slider">
        <div className="slider-contenido">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`slide ${index === slideActual ? "activo" : ""}`}
            >
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
          ))}
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
        <div className="categorias-grid">
          {categorias.map((categoria) => (
            <div
              key={categoria.id}
              className="categoria-icono"
              onClick={() => manejarClickCategoria(categoria.ruta)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter") manejarClickCategoria(categoria.ruta);
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
      </section>
    </div>
  );
}

export default Inicio;