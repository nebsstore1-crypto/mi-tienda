import { useState } from "react";
import "../styles/admin.css";

import {
  agregarProducto,
  editarProducto
} from "../services/productosService";

import {
  agregarImagenProducto
} from "../services/productoImagenesService";

import { subirImagen } from "../services/storageService";

import TablaProductos from "../components/admin/TablaProductos";


function AdminProductos() {

  // ==========================================
  // PRODUCTO
  // ==========================================

  const [producto, setProducto] = useState({

    nombre: "",
    precio: "",
    categoria: "Hombre",
    marca: "",
    stock: "",
    estado: "Nuevo",
    descripcion: "",
    imagen: null

  });


  // ==========================================
  // IMAGEN PRINCIPAL
  // ==========================================

  const [preview, setPreview] = useState("");


  // ==========================================
  // IMÁGENES ADICIONALES
  // ==========================================

  const [imagenesAdicionales, setImagenesAdicionales] =
    useState([]);

  const [previewsAdicionales, setPreviewsAdicionales] =
    useState([]);


  // ==========================================
  // PRODUCTO EDITANDO
  // ==========================================

  const [productoEditando, setProductoEditando] =
    useState(null);


  // ==========================================
  // CAMBIO NUEVO
  // CONTROLAR GUARDADO
  // ==========================================

  const [guardando, setGuardando] =
    useState(false);


  // ==========================================
  // CAMBIAR CAMPOS
  // ==========================================

  function handleChange(e) {

    setProducto({

      ...producto,

      [e.target.name]: e.target.value

    });

  }


  // ==========================================
  // IMAGEN PRINCIPAL
  // ==========================================

  function seleccionarImagen(e) {

    const file = e.target.files[0];

    if (!file) return;


    setPreview(
      URL.createObjectURL(file)
    );


    setProducto({

      ...producto,

      imagen: file

    });

  }


  // ==========================================
  // VARIAS IMÁGENES
  // ==========================================

  function seleccionarImagenesAdicionales(e) {

    const files = Array.from(e.target.files);

    if (!files.length) return;


    setImagenesAdicionales(files);


    const nuevasPreviews = files.map(
      (file) => URL.createObjectURL(file)
    );


    setPreviewsAdicionales(
      nuevasPreviews
    );

  }


  // ==========================================
  // EDITAR PRODUCTO
  // ==========================================

  function editar(productoSeleccionado) {

    setProductoEditando(
      productoSeleccionado
    );


    setProducto({

      nombre:
        productoSeleccionado.nombre,

      precio:
        productoSeleccionado.precio,

      categoria:
        productoSeleccionado.categoria,

      marca:
        productoSeleccionado.marca,

      stock:
        productoSeleccionado.stock,

      estado:
        productoSeleccionado.estado,

      descripcion:
        productoSeleccionado.descripcion,

      imagen:
        productoSeleccionado.imagen

    });


    setPreview(
      productoSeleccionado.imagen
    );


    setImagenesAdicionales([]);

    setPreviewsAdicionales([]);


    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });

  }


  // ==========================================
  // GUARDAR PRODUCTO
  // ==========================================

  async function guardarProducto(e) {

    e.preventDefault();


    // ========================================
    // CAMBIO NUEVO
    // EVITAR DOBLE CLIC / DOBLE GUARDADO
    // ========================================

    if (guardando) return;


    setGuardando(true);


    try {


      // ========================================
      // IMAGEN PRINCIPAL
      // ========================================

      let urlImagen =
        producto.imagen;


      if (
        producto.imagen instanceof File
      ) {

        urlImagen =
          await subirImagen(
            producto.imagen
          );

      }


      // ========================================
      // DATOS DEL PRODUCTO
      // ========================================

      const datosProducto = {

        nombre:
          producto.nombre,

        precio:
          Number(producto.precio),

        categoria:
          producto.categoria,

        marca:
          producto.marca,

        stock:
          Number(producto.stock),

        estado:
          producto.estado,

        descripcion:
          producto.descripcion,

        // SOLO LA IMAGEN PRINCIPAL
        imagen:
          urlImagen,

        visible: true

      };


      // ========================================
      // EDITAR PRODUCTO
      // ========================================

      if (productoEditando) {


        await editarProducto(

          productoEditando.id,

          datosProducto

        );


        // =====================================
        // FOTOS ADICIONALES
        // =====================================

        for (
          let i = 0;
          i < imagenesAdicionales.length;
          i++
        ) {

          const archivo =
            imagenesAdicionales[i];


          const url =
            await subirImagen(
              archivo
            );


          await agregarImagenProducto(

            productoEditando.id,

            url,

            i + 1

          );

        }


        alert(
          "✅ Producto actualizado correctamente"
        );

      }


      // ========================================
      // NUEVO PRODUCTO
      // ========================================

      else {


        // =====================================
        // CREAR SOLO UN PRODUCTO
        // =====================================

        const productoCreado =
          await agregarProducto(
            datosProducto
          );


        // =====================================
        // FOTOS ADICIONALES
        // =====================================

        for (
          let i = 0;
          i < imagenesAdicionales.length;
          i++
        ) {

          const archivo =
            imagenesAdicionales[i];


          const url =
            await subirImagen(
              archivo
            );


          await agregarImagenProducto(

            productoCreado.id,

            url,

            i + 1

          );

        }


        alert(
          "✅ Producto agregado correctamente"
        );

      }


      // ========================================
      // LIMPIAR
      // ========================================

      limpiarFormulario();


    } catch (error) {

      console.error(
        "Error guardando producto:",
        error
      );


      alert(
        error.message
      );


    } finally {


      // ========================================
      // CAMBIO NUEVO
      // VOLVER A ACTIVAR EL BOTÓN
      // ========================================

      setGuardando(false);

    }

  }


  // ==========================================
  // LIMPIAR FORMULARIO
  // ==========================================

  function limpiarFormulario() {

    setProducto({

      nombre: "",
      precio: "",
      categoria: "Hombre",
      marca: "",
      stock: "",
      estado: "Nuevo",
      descripcion: "",
      imagen: null

    });


    setPreview("");


    setImagenesAdicionales([]);


    setPreviewsAdicionales([]);


    setProductoEditando(null);

  }


  // ==========================================
  // RENDER
  // ==========================================

  return (

    <div className="admin">


      <h1>
        📦 Administración de Productos
      </h1>


      {/* =====================================
          FORMULARIO
      ===================================== */}

      <form
        className="form-admin"
        onSubmit={guardarProducto}
      >


        <input
          type="text"
          name="nombre"
          placeholder="Nombre del producto"
          value={producto.nombre}
          onChange={handleChange}
          required
        />


        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={producto.precio}
          onChange={handleChange}
          required
        />


        <select
          name="categoria"
          value={producto.categoria}
          onChange={handleChange}
        >

          <option value="Hombre">
            Hombre
          </option>

          <option value="Mujer">
            Mujer
          </option>

          <option value="Niño">
            Niño
          </option>

        </select>


        <input
          type="text"
          name="marca"
          placeholder="Marca"
          value={producto.marca}
          onChange={handleChange}
        />


        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={producto.stock}
          onChange={handleChange}
        />


        <select
          name="estado"
          value={producto.estado}
          onChange={handleChange}
        >

          <option value="Nuevo">
            Nuevo
          </option>

          <option value="Oferta">
            Oferta
          </option>

          <option value="Normal">
            Normal
          </option>

        </select>


        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={producto.descripcion}
          onChange={handleChange}
        />


        {/* =====================================
            IMAGEN PRINCIPAL
        ===================================== */}

        <div className="contenedor-imagen">

          <h3>
            🖼️ Imagen principal
          </h3>


          <input
            type="file"
            accept="image/*"
            onChange={seleccionarImagen}
          />


          {preview && (

            <img
              src={preview}
              alt="Vista previa"
              className="preview-imagen"
            />

          )}

        </div>


        {/* =====================================
            FOTOS ADICIONALES
        ===================================== */}

        <div className="contenedor-imagenes-adicionales">

          <h3>
            📸 Fotos adicionales
          </h3>


          <p>
            Puedes seleccionar varias imágenes
            para este producto.
          </p>


          <input
            type="file"
            accept="image/*"
            multiple
            onChange={
              seleccionarImagenesAdicionales
            }
          />


          {/* ==================================
              PREVISUALIZACIÓN
          ================================== */}

          {previewsAdicionales.length > 0 && (

            <div className="preview-galeria">

              {previewsAdicionales.map(
                (imagen, index) => (

                  <div
                    className="preview-item"
                    key={index}
                  >

                    <img
                      src={imagen}
                      alt={`Foto adicional ${index + 1}`}
                    />


                    <span>
                      Foto {index + 1}
                    </span>

                  </div>

                )
              )}

            </div>

          )}

        </div>


        {/* =====================================
            BOTÓN GUARDAR
        ===================================== */}

        <button
          type="submit"
          disabled={guardando}
        >

          {guardando

            ? "⏳ Guardando..."

            : productoEditando

              ? "Actualizar Producto"

              : "Guardar Producto"

          }

        </button>


        {/* =====================================
            CANCELAR EDICIÓN
        ===================================== */}

        {productoEditando && (

          <button
            type="button"
            onClick={limpiarFormulario}
            disabled={guardando}
          >

            Cancelar edición

          </button>

        )}


      </form>


      {/* =====================================
          TABLA DE PRODUCTOS
      ===================================== */}

      <TablaProductos
        onEditar={editar}
      />


    </div>

  );

}


export default AdminProductos;