import { useEffect, useState } from "react";
import "../../styles/carouselAdmin.css";

import {
  agregarImagen,
  obtenerCarousel,
  eliminarImagen,
  moverImagen
} from "../../services/carouselService";

import { subirImagenCarousel } from "../../services/storageCarousel";

function CarouselAdmin() {

  const [imagenes, setImagenes] = useState([]);
  const [archivo, setArchivo] = useState(null);
  const [preview, setPreview] = useState("");
  const [subiendo, setSubiendo] = useState(false);

  // ==========================================
  // CARGAR IMÁGENES
  // ==========================================

  async function cargarImagenes() {

    try {

      const data = await obtenerCarousel();

      setImagenes(data);

    } catch (error) {

      console.error(error);

      alert(error.message);

    }

  }

  useEffect(() => {

    cargarImagenes();

  }, []);


  // ==========================================
  // SELECCIONAR IMAGEN
  // ==========================================

  function seleccionarImagen(e) {

    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {

      alert("Selecciona una imagen válida.");

      return;

    }

    setArchivo(file);

    const url = URL.createObjectURL(file);

    setPreview(url);

  }


  // ==========================================
  // SUBIR IMAGEN
  // ==========================================

  async function subir() {

    if (!archivo) {

      alert("Selecciona una imagen primero.");

      return;

    }

    try {

      setSubiendo(true);

      const url =
        await subirImagenCarousel(archivo);

      await agregarImagen(url);

      alert("✅ Imagen agregada correctamente");

      setArchivo(null);

      setPreview("");

      await cargarImagenes();

    } catch (error) {

      console.error(error);

      alert(error.message);

    } finally {

      setSubiendo(false);

    }

  }


  // ==========================================
  // ELIMINAR
  // ==========================================

  async function eliminar(id) {

    const confirmar =
      window.confirm(
        "¿Seguro que deseas eliminar esta imagen?"
      );

    if (!confirmar) return;

    try {

      await eliminarImagen(id);

      alert("🗑️ Imagen eliminada");

      await cargarImagenes();

    } catch (error) {

      console.error(error);

      alert(error.message);

    }

  }
  // ==========================================
// MOVER IMAGEN
// ==========================================

async function mover(id, direccion) {

  try {

    await moverImagen(id, direccion);

    await cargarImagenes();

  } catch (error) {

    console.error(error);

    alert(error.message);

  }

}

  


  // ==========================================
  // RENDER
  // ==========================================

  return (

    <div className="carousel-admin">


      {/* ======================================
          ENCABEZADO
      ====================================== */}

      <div className="carousel-header">

        <h2>
          🎞️ Administrador del Carrusel
        </h2>

        <p>
          Administra las imágenes que aparecen
          en el carrusel de la página de inicio.
        </p>

      </div>


      {/* ======================================
          SUBIR IMAGEN
      ====================================== */}

      <div className="carousel-upload">

        <h3>
          ➕ Agregar nueva imagen
        </h3>

        <p>
          Selecciona una imagen para agregarla
          al carrusel.
        </p>


        <label className="upload-box">

          <span className="upload-icon">
            📁
          </span>

          <span>
            Seleccionar imagen
          </span>

          <input
            type="file"
            accept="image/*"
            onChange={seleccionarImagen}
          />

        </label>


        {/* VISTA PREVIA */}

        {preview && (

          <div className="carousel-preview">

            <h4>
              Vista previa
            </h4>

            <img
              src={preview}
              alt="Vista previa"
            />

          </div>

        )}


        <button
          type="button"
          className="btn-subir-carousel"
          onClick={subir}
          disabled={subiendo}
        >

          {subiendo
            ? "⏳ Subiendo..."
            : "💾 Guardar imagen"
          }

        </button>

      </div>


      {/* ======================================
          IMÁGENES GUARDADAS
      ====================================== */}

      <div className="carousel-listado">

        <div className="carousel-listado-header">

          <h3>
            🖼️ Imágenes del carrusel
          </h3>

          <span>
            {imagenes.length} imagen
            {imagenes.length !== 1 ? "es" : ""}
          </span>

        </div>


        {imagenes.length === 0 && (

          <div className="carousel-vacio">

            <div>
              🎞️
            </div>

            <p>
              No hay imágenes en el carrusel.
            </p>

            <small>
              Agrega una imagen para comenzar.
            </small>

          </div>

        )}


        <div className="lista-carousel">

          {imagenes.map((img, index) => (

            <div
              key={img.id}
              className="item-carousel"
            >

              {/* NÚMERO */}

              <div className="carousel-numero">

                Imagen {index + 1}

              </div>


              {/* IMAGEN */}

              <div className="carousel-imagen">

                <img
                  src={img.imagen}
                  alt={`Carrusel ${index + 1}`}
                />

              </div>


              {/* INFORMACIÓN */}

              <div className="carousel-info">

                <span className="carousel-estado">

                  🟢 Disponible

                </span>

              </div>


              {/* BOTONES */}

{/* ======================================
    ORDEN DEL CARRUSEL
====================================== */}

<div className="carousel-orden">

  {/* PRINCIPAL */}

  {index === 0 && (

    <div className="carousel-principal">

      ⭐ IMAGEN PRINCIPAL

    </div>

  )}


  <div className="carousel-botones">

    <button
      type="button"
      className="btn-mover"
      disabled={index === 0}
      onClick={() =>
        mover(img.id, "arriba")
      }
    >

      ⬆️ Subir

    </button>


    <button
      type="button"
      className="btn-mover"
      disabled={
        index === imagenes.length - 1
      }
      onClick={() =>
        mover(img.id, "abajo")
      }
    >

      ⬇️ Bajar

    </button>

  </div>

</div>


<button
  type="button"
  className="btn-eliminar-carousel"
  onClick={() =>
    eliminar(img.id)
  }
>

  🗑️ Eliminar

</button>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default CarouselAdmin;