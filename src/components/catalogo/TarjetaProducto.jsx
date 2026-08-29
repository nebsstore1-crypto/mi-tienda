import { Link } from "react-router-dom";
import { formatoPrecio } from "../../services/productosService";

function TarjetaProducto({ producto }) {

  return (

    <div className="tarjeta-producto">

      {/* =====================================
          ETIQUETA
      ===================================== */}

      {producto.estado && (

        <span
          className={`etiqueta ${
            producto.estado === "Oferta"
              ? "oferta"
              : "nuevo"
          }`}
        >
          {producto.estado}
        </span>

      )}


      {/* =====================================
          IMAGEN
      ===================================== */}

      <div className="imagen-producto">

        <img
          src={producto.imagen}
          alt={producto.nombre}
        />

      </div>


      {/* =====================================
          INFORMACIÓN
      ===================================== */}

      <div className="info-producto">

        <h3>
          {producto.nombre}
        </h3>


        <p className="categoria">
          {producto.categoria}
        </p>


        <p className="precio">
          {formatoPrecio(producto.precio)}
        </p>


        {/* =================================
            VER PRODUCTO
        ================================= */}

        <Link
          to={`/producto/${producto.id}`}
          className="btn-producto"
        >
          Ver producto
        </Link>

      </div>

    </div>

  );

}

export default TarjetaProducto;