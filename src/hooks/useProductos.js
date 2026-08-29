import { useEffect, useState } from "react";
import { obtenerProductos } from "../services/productosService";

function useProductos() {

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  async function cargarProductos() {

    try {

      const data = await obtenerProductos();

      setProductos(data);

    } catch (error) {

      console.error("Error cargando productos:", error);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    cargarProductos();

  }, []);

  return {

    productos,
    loading,
    recargar: cargarProductos

  };

}

export default useProductos;