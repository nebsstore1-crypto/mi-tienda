import "../../styles/hero.css";

import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Carousel from "./Carousel";

import { obtenerFondo } from "../../services/fondoService";


function Hero() {

  const [fondo, setFondo] = useState("");


  useEffect(() => {

    cargarFondo();

  }, []);


  async function cargarFondo() {

    try {

      const datos = await obtenerFondo();

      if (datos) {

        setFondo(datos.imagen);

      }

    } catch (error) {

      console.error(
        "Error cargando fondo:",
        error
      );

    }

  }


  return (

    <section className="hero">

      {/* ==================================
          FONDO
      ================================== */}

      {fondo && (

        <img
          src={fondo}
          alt=""
          className="hero-banner"
        />

      )}


      {/* ==================================
          CAPA OSCURA
      ================================== */}

      <div className="hero-overlay"></div>


      {/* ==================================
          CONTENIDO
      ================================== */}

      <div className="hero-content">

        {/* CARRUSEL */}

        <div className="hero-carousel">

          <Carousel />

        </div>


        {/* BOTÓN */}

        <Link
          to="/catalogo"
          className="btn-primary"
        >

          👟 Explorar Catálogo

        </Link>

      </div>

    </section>

  );

}


export default Hero;