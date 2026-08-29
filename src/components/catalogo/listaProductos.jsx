import useProductos from "../../hooks/useProductos";
import TarjetaProducto from "./TarjetaProducto";

function ListaProductos({ categoria }) {

  const { productos, loading } = useProductos();

  if (loading) {

    return <h2>Cargando productos...</h2>;

  }

  const lista = productos.filter(
    (producto) => producto.categoria === categoria
  );

  return (

    <section className="lista-productos">

      <h2>{categoria}</h2>

      <div className="contenedor-tarjetas">

        {lista.map((producto) => (

          <TarjetaProducto
            key={producto.id}
            producto={producto}
          />

        ))}

      </div>

    </section>

  );

}

export default ListaProductos;