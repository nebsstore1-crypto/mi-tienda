import useProductos from "../../hooks/useProductos";

import {
  eliminarProducto,
  formatoPrecio
} from "../../services/productosService";

import {
  obtenerImagenesProducto
} from "../../services/productoImagenesService";

import {
  eliminarImagen
} from "../../services/storageService";


function TablaProductos({ onEditar }) {

  const {
    productos,
    loading,
    recargar
  } = useProductos();


  // ==========================
  // EDITAR PRODUCTO
  // ==========================

  function editarProductoSeleccionado(producto) {

    onEditar(producto);

  }


  // ==========================
  // ELIMINAR PRODUCTO
  // ==========================

  async function eliminarProductoSeleccionado(producto) {

    const confirmar = window.confirm(
      `¿Seguro que deseas eliminar "${producto.nombre}"?\n\nTambién se eliminarán todas sus imágenes.`
    );

    if (!confirmar) return;


    try {

      // ==========================================
      // 1. BUSCAR IMÁGENES ADICIONALES
      // ==========================================

      const imagenesAdicionales =
        await obtenerImagenesProducto(
          producto.id
        );


      // ==========================================
      // 2. ELIMINAR IMAGEN PRINCIPAL DEL STORAGE
      // ==========================================

      if (producto.imagen) {

        await eliminarImagen(
          producto.imagen
        );

      }


      // ==========================================
      // 3. ELIMINAR IMÁGENES ADICIONALES
      // ==========================================

      for (
        const imagen of imagenesAdicionales
      ) {

        if (imagen.imagen) {

          await eliminarImagen(
            imagen.imagen
          );

        }

      }


      // ==========================================
      // 4. ELIMINAR PRODUCTO DE SUPABASE
      // ==========================================

      await eliminarProducto(
        producto.id
      );


      // ==========================================
      // 5. ACTUALIZAR TABLA
      // ==========================================

      alert(
        "✅ Producto, imágenes y archivos eliminados correctamente."
      );

      recargar();


    } catch (error) {

      console.error(
        "❌ Error eliminando producto:",
        error
      );

      alert(
        "❌ No se pudo eliminar el producto.\n\n" +
        error.message
      );

    }

  }


  // ==========================
  // CARGANDO
  // ==========================

  if (loading) {

    return (
      <h2>
        Cargando productos...
      </h2>
    );

  }


  // ==========================
  // TABLA
  // ==========================

  return (

    <div className="tabla-productos">

      <h2>
        Productos registrados
      </h2>


      <table>

        <thead>

          <tr>

            <th>Imagen</th>

            <th>Nombre</th>

            <th>Categoría</th>

            <th>Precio</th>

            <th>Stock</th>

            <th>Estado</th>

            <th>Editar</th>

            <th>Eliminar</th>

          </tr>

        </thead>


        <tbody>

          {productos.map((producto) => (

            <tr key={producto.id}>


              {/* ==========================
                  IMAGEN
              ========================== */}

              <td>

                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  width="70"
                />

              </td>


              {/* ==========================
                  NOMBRE
              ========================== */}

              <td>

                {producto.nombre}

              </td>


              {/* ==========================
                  CATEGORÍA
              ========================== */}

              <td>

                {producto.categoria}

              </td>


              {/* ==========================
                  PRECIO
              ========================== */}

              <td>

                {formatoPrecio(
                  producto.precio
                )}

              </td>


              {/* ==========================
                  STOCK
              ========================== */}

              <td>

                {producto.stock}

              </td>


              {/* ==========================
                  ESTADO
              ========================== */}

              <td>

                {producto.estado}

              </td>


              {/* ==========================
                  EDITAR
              ========================== */}

              <td>

                <button
                  className="btn-editar"
                  onClick={() =>
                    editarProductoSeleccionado(
                      producto
                    )
                  }
                >

                  ✏️

                </button>

              </td>


              {/* ==========================
                  ELIMINAR
              ========================== */}

              <td>

                <button
                  className="btn-eliminar"
                  onClick={() =>
                    eliminarProductoSeleccionado(
                      producto
                    )
                  }
                >

                  🗑️

                </button>

              </td>


            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}


export default TablaProductos;