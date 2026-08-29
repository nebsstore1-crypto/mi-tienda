import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "../styles/producto.css";

function Producto() {

  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [imagenes, setImagenes] = useState([]);

  const [imagenActual, setImagenActual] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // CARGAR PRODUCTO E IMÁGENES
  // ==========================================

  useEffect(() => {

    async function cargarProducto() {

      try {

        setLoading(true);
        setError("");

        // ======================================
        // PRODUCTO PRINCIPAL
        // ======================================

        const { data: productoData, error: productoError } =
          await supabase
            .from("productos")
            .select("*")
            .eq("id", id)
            .single();

        if (productoError) {
          throw productoError;
        }

        setProducto(productoData);

        // Imagen principal
        setImagenActual(productoData.imagen);


        // ======================================
        // IMÁGENES ADICIONALES
        // ======================================

        const { data: imagenesData, error: imagenesError } =
          await supabase
            .from("producto_imagenes")
            .select("*")
            .eq("producto_id", id)
            .order("orden", {
              ascending: true
            });

        if (imagenesError) {
          throw imagenesError;
        }

        setImagenes(imagenesData || []);

      }

      catch (error) {

        console.error(
          "Error cargando producto:",
          error
        );

        setError(
          "No se pudo encontrar el producto."
        );

      }

      finally {

        setLoading(false);

      }

    }

    cargarProducto();

  }, [id]);


  // ==========================================
  // CARGANDO
  // ==========================================

  if (loading) {

    return (

      <section className="producto-loading">

        <h2>
          Cargando producto...
        </h2>

      </section>

    );

  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error || !producto) {

    return (

      <section className="producto-error">

        <h2>
          😕 Producto no encontrado
        </h2>

        <p>
          El producto que buscas no existe
          o fue eliminado.
        </p>

        <Link
          to="/catalogo"
          className="btn-volver"
        >
          ← Volver al catálogo
        </Link>

      </section>

    );

  }


  // ==========================================
  // WHATSAPP
  // ==========================================

  const mensaje =
    `Hola, estoy interesado en el producto: ${producto.nombre}`;

  const whatsapp =
    `https://wa.me/573228593252?text=${encodeURIComponent(
      mensaje
    )}`;


  // ==========================================
  // PRODUCTO
  // ==========================================

  return (

    <section className="producto-detalle">

      <div className="producto-contenedor">


        {/* =====================================
            GALERÍA DE IMÁGENES
        ===================================== */}

        <div className="producto-galeria">


          {/* IMAGEN GRANDE */}

          <div className="producto-imagen">

            <img
              src={imagenActual}
              alt={producto.nombre}
            />

          </div>


          {/* MINIATURAS */}

          <div className="miniaturas">


            {/* IMAGEN PRINCIPAL */}

            <button
              type="button"
              className={
                imagenActual === producto.imagen
                  ? "miniatura activa"
                  : "miniatura"
              }
              onClick={() =>
                setImagenActual(producto.imagen)
              }
            >

              <img
                src={producto.imagen}
                alt="Imagen principal"
              />

            </button>


            {/* IMÁGENES ADICIONALES */}

            {imagenes.map((imagen) => (

              <button
                type="button"
                key={imagen.id}
                className={
                  imagenActual === imagen.imagen
                    ? "miniatura activa"
                    : "miniatura"
                }
                onClick={() =>
                  setImagenActual(imagen.imagen)
                }
              >

                <img
                  src={imagen.imagen}
                  alt={`${producto.nombre} ${imagen.orden}`}
                />

              </button>

            ))}

          </div>

        </div>


        {/* =====================================
            INFORMACIÓN
        ===================================== */}

        <div className="producto-info">


          <span className="producto-categoria">

            {producto.categoria}

          </span>


          <h1>

            {producto.nombre}

          </h1>


          <div className="producto-precio">

            ${Number(producto.precio).toLocaleString("es-CO")}

          </div>


          {/* STOCK */}

          <div className="producto-stock">

            {producto.stock > 0 ? (

              <span className="stock-disponible">

                🟢 Disponible

              </span>

            ) : (

              <span className="stock-agotado">

                🔴 Agotado

              </span>

            )}

          </div>


          {/* ESTADO */}

          {producto.estado && (

            <p className="producto-estado">

              Estado: {producto.estado}

            </p>

          )}


          {/* DESCRIPCIÓN */}

          {producto.descripcion && (

            <div className="producto-descripcion">

              <h3>
                Descripción
              </h3>

              <p>
                {producto.descripcion}
              </p>

            </div>

          )}


          {/* =================================
              WHATSAPP
          ================================= */}

          {producto.stock > 0 && (

            <a
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn-comprar"
            >

              📲 Comprar por WhatsApp

            </a>

          )}


          {/* =================================
              VOLVER
          ================================= */}

          <Link
            to="/catalogo"
            className="btn-volver"
          >

            ← Volver al catálogo

          </Link>


        </div>

      </div>

    </section>

  );

}

export default Producto;