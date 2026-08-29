import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useProductos from "../../hooks/useProductos";
import TarjetaProducto from "./TarjetaProducto";

import "../../styles/sliderProductos.css";

function SliderProductos({ categoria }) {

  const { productos, loading } = useProductos();

  const lista = productos.filter(
    (producto) => producto.categoria === categoria
  );

  const [inicio, setInicio] = useState(0);

  useEffect(() => {

    if (lista.length <= 3) return;

    const intervalo = setInterval(() => {

      setInicio((prev) => (prev + 3) % lista.length);

    }, 3000);

    return () => clearInterval(intervalo);

  }, [lista.length]);

  if (loading) {

    return (
      <section className="slider-productos">
        <h2>{categoria}</h2>
        <p>Cargando productos...</p>
      </section>
    );

  }

  if (lista.length === 0) {

    return (
      <section className="slider-productos">
        <h2>{categoria}</h2>
        <p>No hay productos disponibles.</p>
      </section>
    );

  }

  const visibles = [];

  const cantidad = Math.min(3, lista.length);

  for (let i = 0; i < cantidad; i++) {

    visibles.push(
      lista[(inicio + i) % lista.length]
    );

  }

  return (

    <section className="slider-productos">

      <h2>{categoria}</h2>

      <div className="contenedor-tarjetas">

        {visibles.map((producto) => (

          <TarjetaProducto
            key={producto.id}
            producto={producto}
          />

        ))}

      </div>

      <Link
        to={`/${categoria.toLowerCase()}`}
        className="btn-categoria"
      >
        Ver categoría
      </Link>

    </section>

  );

}

export default SliderProductos;