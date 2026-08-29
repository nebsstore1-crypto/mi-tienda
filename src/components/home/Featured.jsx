import "../../styles/featured.css";
import useProductos from "../../hooks/useProductos";
import { Link } from "react-router-dom";
import { formatoPrecio } from "../../services/productosService";

function Featured() {

  const { productos, loading } = useProductos();

  // ==========================================
  // CARGANDO
  // ==========================================

  if (loading) {

    return (
      <h2>
        Cargando productos...
      </h2>
    );

  }


  // ==========================================
  // PRODUCTOS DESTACADOS
  // ==========================================

  return (

    <section className="featured">

      <h2>
        🔥 Productos Destacados
      </h2>


      <div className="products">

        {productos.slice(0, 4).map((producto) => (

          <div
            className="product-card"
            key={producto.id}
          >

            {/* =================================
                IMAGEN
            ================================= */}

            <img
              src={producto.imagen}
              alt={producto.nombre}
            />


            {/* =================================
                NOMBRE
            ================================= */}

            <h3>
              {producto.nombre}
            </h3>


            {/* =================================
                CATEGORÍA
            ================================= */}

            <p>
              {producto.categoria}
            </p>


            {/* =================================
                PRECIO
            ================================= */}

            <h4>
              {formatoPrecio(producto.precio)}
            </h4>


            {/* =================================
                VER PRODUCTO
            ================================= */}

            <Link
              to={`/producto/${producto.id}`}
              className="btn-ver-producto"
            >
              Ver Producto
            </Link>


          </div>

        ))}

      </div>

    </section>

  );

}

export default Featured;