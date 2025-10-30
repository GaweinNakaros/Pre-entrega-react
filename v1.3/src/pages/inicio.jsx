import React from "react";
import "./inicio.css";
import Slider from "../components/Slider";
import CategoriasSlider from "../components/CategoriasSlider";
import PromocionesDestacadas from "../components/PromocionesDestacadas";

function Inicio() {
  // Array de slides para el banner principal
  const slides = [
    { id: 1, titulo: "Bienvenido a Nuestra Tienda", descripcion: "Encuentra los mejores productos", imagen: null },
    { id: 2, titulo: "Ofertas Especiales", descripcion: "Descuentos increíbles esta semana", imagen: null },
    { id: 3, titulo: "Envío Gratis", descripcion: "En compras mayores a $50", imagen: null }
  ];

  return (
    <div className="inicio-container">
      {/* Sección de Promociones Destacadas */}
      <PromocionesDestacadas
        soloActivas={true}
        limite={3}
      />

      {/* Banner con Slider Automático */}
      <Slider
        id="banner-principal"
        slides={slides}
        intervalo={5000}
        loop={true}
        mostrarIndicadores={true}
        mostrarFlechas={false}
        altura="200px"
        className="banner-slider"
      />
      
      {/* Iconos de Categorías */}
      <CategoriasSlider
        titulo="Categorías"
        mostrarTitulo={true}
        soloActivas={true}
      />
    </div>
  );
}

export default Inicio;