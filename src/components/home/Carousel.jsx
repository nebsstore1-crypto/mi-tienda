import "../../styles/carousel.css";

import { useState, useEffect } from "react";

import { obtenerCarousel } from "../../services/carouselService";

import { supabase } from "../../lib/supabase";


function Carousel() {

  const [imagenes, setImagenes] = useState([]);

  const [actual, setActual] = useState(0);


  // ==========================================
  // CARGAR IMÁGENES
  // ==========================================

  async function cargarImagenes() {

    try {

      const data = await obtenerCarousel();

      setImagenes(data || []);

    } catch (error) {

      console.error(
        "Error cargando carrusel:",
        error
      );

    }

  }


  // ==========================================
  // CARGA INICIAL + TIEMPO REAL
  // ==========================================

  useEffect(() => {

    cargarImagenes();


    const canal = supabase
      .channel("carousel-tiempo-real")

      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "carousel"
        },
        () => {

          console.log(
            "🔄 Carrusel actualizado"
          );

          cargarImagenes();

        }
      )

      .subscribe();


    return () => {

      supabase.removeChannel(canal);

    };

  }, []);


  // ==========================================
  // CAMBIO AUTOMÁTICO
  // ==========================================

  useEffect(() => {

    if (imagenes.length <= 1) return;


    if (actual >= imagenes.length) {

      setActual(0);

      return;

    }


    const intervalo = setInterval(() => {

      setActual((prev) =>
        (prev + 1) % imagenes.length
      );

    }, 3500);


    return () => {

      clearInterval(intervalo);

    };

  }, [imagenes.length]);


  // ==========================================
  // CALCULAR POSICIÓN DE CADA IMAGEN
  // ==========================================

  function obtenerPosicion(index) {

    const cantidad = imagenes.length;

    let diferencia = index - actual;


    /*
      Hace que el carrusel sea circular.

      Ejemplo:

      0 → 1 → 2 → 3 → 0
    */

    if (diferencia > cantidad / 2) {

      diferencia -= cantidad;

    }

    if (diferencia < -cantidad / 2) {

      diferencia += cantidad;

    }


    // Imagen central

    if (diferencia === 0) {

      return "posicion-central";

    }


    // Imagen inmediatamente a la izquierda

    if (diferencia === -1) {

      return "posicion-izquierda";

    }


    // Imagen inmediatamente a la derecha

    if (diferencia === 1) {

      return "posicion-derecha";

    }


    // Segunda imagen izquierda

    if (diferencia === -2) {

      return "posicion-izquierda-2";

    }


    // Segunda imagen derecha

    if (diferencia === 2) {

      return "posicion-derecha-2";

    }


    // Las demás se esconden

    return "posicion-oculta";

  }


  // ==========================================
  // SIN IMÁGENES
  // ==========================================

  if (imagenes.length === 0) {

    return (

      <div className="carousel-loading">

        <h2>
          Cargando...
        </h2>

      </div>

    );

  }


  // ==========================================
  // CARRUSEL
  // ==========================================

  return (

    <div className="carousel">


      {/* ======================================
          ESCENARIO 3D
      ====================================== */}

      <div className="carousel-escenario">


        {imagenes.map((item, index) => (

          <div
            key={item.id}
            className={`carousel-card ${obtenerPosicion(index)}`}
          >

            <img
              src={item.imagen}
              alt={`Producto destacado ${index + 1}`}
              className="carousel-img"
            />

          </div>

        ))}


      </div>



      {/* ======================================
          INDICADORES
      ====================================== */}

      {imagenes.length > 1 && (

        <div className="carousel-dots">

          {imagenes.map((_, index) => (

            <button
              type="button"
              key={index}
              className={
                actual === index
                  ? "dot active-dot"
                  : "dot"
              }
              onClick={() => setActual(index)}
              aria-label={`Ir a imagen ${index + 1}`}
            />

          ))}

        </div>

      )}

    </div>

  );

}


export default Carousel;