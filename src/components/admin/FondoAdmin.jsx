import { useEffect, useState } from "react";

import {
  obtenerFondos,
  agregarFondo,
  activarFondo,
  eliminarFondo
} from "../../services/fondoService";

import {
  subirImagenFondo,
  eliminarImagenFondo
} from "../../services/storageFondo";


function FondoAdmin() {

  const [fondos, setFondos] = useState([]);

  const [archivo, setArchivo] = useState(null);

  const [preview, setPreview] = useState("");

  const [guardando, setGuardando] = useState(false);

  const [cargando, setCargando] = useState(true);


  /* ==========================================
     CARGAR FONDOS
  ========================================== */

  useEffect(() => {

    cargarFondos();

  }, []);


  async function cargarFondos() {

    try {

      setCargando(true);

      const datos = await obtenerFondos();

      setFondos(datos);

    } catch (error) {

      console.error(error);

      alert(error.message);

    } finally {

      setCargando(false);

    }

  }


  /* ==========================================
     SELECCIONAR IMAGEN
  ========================================== */

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


  /* ==========================================
     SUBIR NUEVO FONDO
  ========================================== */

  async function guardarFondo() {

    if (!archivo) {

      alert("Selecciona una imagen primero.");

      return;

    }


    try {

      setGuardando(true);


      console.log("1. Subiendo imagen...");


      const urlImagen =
        await subirImagenFondo(archivo);


      console.log(
        "2. Imagen subida:",
        urlImagen
      );


      await agregarFondo(urlImagen);


      console.log("3. Fondo guardado");


      alert("✅ Fondo agregado correctamente");


      // Limpiar

      setArchivo(null);

      setPreview("");


      // Recargar fondos

      await cargarFondos();

    } catch (error) {

      console.error(error);

      alert(error.message);

    } finally {

      setGuardando(false);

    }

  }


  /* ==========================================
     ACTIVAR FONDO
  ========================================== */

  async function usarFondo(fondo) {

    if (fondo.activo) {

      return;

    }


    const confirmar = window.confirm(

      "¿Quieres utilizar este fondo en la página de inicio?"

    );


    if (!confirmar) return;


    try {

      await activarFondo(fondo.id);


      alert("✅ Fondo de inicio actualizado");


      await cargarFondos();

    } catch (error) {

      console.error(error);

      alert(error.message);

    }

  }


  /* ==========================================
     ELIMINAR FONDO
  ========================================== */

async function eliminar(fondo) {

  if (fondo.activo) {

    alert(
      "⚠️ No puedes eliminar el fondo que está actualmente activo."
    );

    return;

  }


  const confirmar = window.confirm(
    "¿Eliminar este fondo definitivamente?"
  );


  if (!confirmar) return;


  try {

    console.log("Fondo seleccionado:", fondo);

    console.log("ID:", fondo.id);

    console.log("URL:", fondo.imagen);


    /*
      1. Eliminar registro de la tabla
    */

    const resultado =
      await eliminarFondo(fondo.id);


    console.log(
      "Registro eliminado de la tabla:",
      resultado
    );


    /*
      2. Eliminar imagen del Storage
    */

    await eliminarImagenFondo(
      fondo.imagen
    );


    console.log(
      "Imagen eliminada del Storage"
    );


    alert(
      "🗑️ Fondo eliminado correctamente"
    );


    /*
      3. Volver a consultar Supabase
    */

    await cargarFondos();


  } catch (error) {

    console.error(
      "ERROR ELIMINANDO FONDO:",
      error
    );

    alert(error.message);

  }

}

  /* ==========================================
     RENDER
  ========================================== */

  return (

    <section className="fondo-admin">


      <h2>
        🖼️ Fondos de la página
      </h2>


      <p className="fondo-descripcion">

        Aquí puedes administrar las imágenes
        utilizadas como fondo de inicio.

      </p>


      {/* ======================================
          SUBIR NUEVO
      ====================================== */}

      <div className="fondo-nuevo">

        <h3>
          Agregar nuevo fondo
        </h3>


        <input
          type="file"
          accept="image/*"
          onChange={seleccionarImagen}
        />


        {preview && (

          <div className="fondo-preview">

            <img
              src={preview}
              alt="Vista previa"
            />

          </div>

        )}


        <button
          type="button"
          className="btn-guardar-fondo"
          onClick={guardarFondo}
          disabled={guardando}
        >

          {guardando
            ? "Subiendo..."
            : "💾 Guardar nuevo fondo"
          }

        </button>

      </div>


      {/* ======================================
          FONDOS GUARDADOS
      ====================================== */}

      <div className="fondos-guardados">

        <h3>
          Fondos guardados
        </h3>


        {cargando && (

          <p>
            Cargando fondos...
          </p>

        )}


        {!cargando && fondos.length === 0 && (

          <p>
            No hay fondos guardados.
          </p>

        )}


        <div className="fondos-grid">

          {fondos.map((fondo) => (

            <div
              className={
                fondo.activo
                  ? "fondo-card activo"
                  : "fondo-card"
              }
              key={fondo.id}
            >

              {/* IMAGEN */}

              <div className="fondo-card-imagen">

                <img
                  src={fondo.imagen}
                  alt="Fondo"
                />

              </div>


              {/* ESTADO */}

              {fondo.activo && (

                <div className="fondo-activo">

                  🟢 FONDO ACTUAL

                </div>

              )}


              {/* BOTONES */}

              <div className="fondo-card-botones">


                {!fondo.activo && (

                  <button
                    type="button"
                    className="btn-usar-fondo"
                    onClick={() =>
                      usarFondo(fondo)
                    }
                  >

                    🔄 Usar este fondo

                  </button>

                )}


                <button
                  type="button"
                  className="btn-eliminar-fondo"
                  onClick={() =>
                    eliminar(fondo)
                  }
                >

                  🗑️ Eliminar

                </button>


              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}


export default FondoAdmin;