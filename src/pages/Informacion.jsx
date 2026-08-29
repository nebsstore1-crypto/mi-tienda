import { useState } from "react";
import "../styles/informacion.css";

function Informacion() {

  const [preguntaAbierta, setPreguntaAbierta] = useState(null);

  function togglePregunta(index) {

    setPreguntaAbierta(
      preguntaAbierta === index
        ? null
        : index
    );

  }

  const preguntas = [

    {
      pregunta: "¿Cómo puedo comprar un producto?",
      respuesta:
        "Selecciona el producto que deseas, revisa su información y comunícate con nosotros para realizar tu compra."
    },

    {
      pregunta: "¿Cómo puedo consultar la disponibilidad?",
      respuesta:
        "Puedes comunicarte directamente con nosotros por WhatsApp para consultar la disponibilidad del producto que deseas."
    },

    {
      pregunta: "¿Qué medios de pago aceptan?",
      respuesta:
        "Para conocer los medios de pago disponibles, puedes comunicarte con nosotros por WhatsApp."
    },

    {
      pregunta: "¿Realizan envíos?",
      respuesta:
        "Consulta con nosotros la disponibilidad y condiciones de envío para tu pedido."
    },

    {
      pregunta: "¿Puedo cambiar un producto?",
      respuesta:
        "Para conocer las condiciones de cambio, comunícate con nosotros antes de realizar tu compra."
    }

  ];


  return (

    <div className="informacion">


      {/* =====================================
          ENCABEZADO
      ===================================== */}

      <section className="informacion-header">

        <h1>
          ℹ️ Información
        </h1>

        <p>
          Todo lo que necesitas saber sobre NESB Store.
        </p>

      </section>


      {/* =====================================
          TARJETAS DE INFORMACIÓN
      ===================================== */}

      <section className="informacion-tarjetas">


        {/* COMPRA */}

        <div className="informacion-card">

          <div className="informacion-icono">
            🛍️
          </div>

          <h2>
            ¿Cómo comprar?
          </h2>

          <p>
            Encuentra el producto que deseas,
            revisa sus características y
            comunícate con nosotros para
            realizar tu compra.
          </p>

        </div>


        {/* ENVÍOS */}

        <div className="informacion-card">

          <div className="informacion-icono">
            🚚
          </div>

          <h2>
            Envíos
          </h2>

          <p>
            Consulta con nosotros la disponibilidad
            y condiciones de envío de tu pedido.
          </p>

        </div>


        {/* PAGOS */}

        <div className="informacion-card">

          <div className="informacion-icono">
            💳
          </div>

          <h2>
            Medios de pago
          </h2>

          <p>
            Comunícate con nosotros para conocer
            los medios de pago disponibles.
          </p>

        </div>


        {/* CAMBIOS */}

        <div className="informacion-card">

          <div className="informacion-icono">
            🔄
          </div>

          <h2>
            Cambios
          </h2>

          <p>
            Si necesitas realizar un cambio,
            comunícate con nosotros para conocer
            las condiciones.
          </p>

        </div>


      </section>


      {/* =====================================
          PREGUNTAS FRECUENTES
      ===================================== */}

      <section className="preguntas-frecuentes">

        <h2>
          ❓ Preguntas frecuentes
        </h2>

        <p className="preguntas-subtitulo">
          Aquí encontrarás respuestas a algunas
          de las preguntas más comunes.
        </p>


        <div className="preguntas-lista">

          {preguntas.map(
            (item, index) => (

              <div
                className={`pregunta ${
                  preguntaAbierta === index
                    ? "pregunta-abierta"
                    : ""
                }`}
                key={index}
              >

                <button
                  type="button"
                  onClick={() =>
                    togglePregunta(index)
                  }
                >

                  <span>
                    {item.pregunta}
                  </span>

                  <span className="pregunta-flecha">
                    {preguntaAbierta === index
                      ? "▲"
                      : "▼"
                    }
                  </span>

                </button>


                {preguntaAbierta === index && (

                  <div className="respuesta">

                    {item.respuesta}

                  </div>

                )}

              </div>

            )
          )}

        </div>

      </section>


      {/* =====================================
          ATENCIÓN AL USUARIO
      ===================================== */}

      <section className="informacion-atencion">

        <div>

          <h2>
            💬 ¿Necesitas ayuda?
          </h2>

          <p>
            Si tienes alguna pregunta sobre nuestros
            productos, disponibilidad o compras,
            puedes comunicarte directamente con nosotros.
          </p>

        </div>


        <a
          href="https://wa.me/573228593252?text=Hola%20NESB%20Store,%20necesito%20informaci%C3%B3n."
          target="_blank"
          rel="noreferrer"
          className="informacion-whatsapp"
        >
          💬 Escribir por WhatsApp
        </a>

      </section>


      {/* =====================================
          CORREO
      ===================================== */}

      <section className="informacion-correo">

        <h2>
          📧 Correo electrónico
        </h2>

        <a href="mailto:nebsstore1@gmail.com">
          nebsstore1@gmail.com
        </a>

      </section>


    </div>

  );

}

export default Informacion;