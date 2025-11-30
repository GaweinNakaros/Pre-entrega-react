import React from "react";
import "./inicio.css";
import Slider from "../components/Slider";
import CategoriasSlider from "../components/CategoriasSlider";
import PromocionesDestacadas from "../components/PromocionesDestacadas";
import { useBanners } from "../context/BannersContext";

function Inicio() {
  const { obtenerBannersActivos } = useBanners();
  
  // Obtener banners activos desde el contexto
  const slides = obtenerBannersActivos();

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