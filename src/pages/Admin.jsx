import { Link, useNavigate } from "react-router-dom";

import "../styles/admin.css";

import { supabase } from "../lib/supabase";


function Admin() {

  const navigate = useNavigate();


  // ==========================================
  // CERRAR SESIÓN
  // ==========================================

  async function cerrarSesion() {

    const { error } =
      await supabase.auth.signOut();


    if (error) {

      console.error(error);

      alert(
        "No se pudo cerrar la sesión."
      );

      return;

    }


    // Ir al login

    navigate("/admin/login");

  }


  // ==========================================
  // PANEL ADMINISTRACIÓN
  // ==========================================

  return (

    <div className="admin-panel">


      {/* =====================================
          ENCABEZADO
      ===================================== */}

      <div className="admin-header">

        <h1>
          ⚙️ Panel de Administración
        </h1>

        <p>
          Administra los productos, imágenes y fondos de NESB Store.
        </p>


        {/* =================================
            BOTÓN CERRAR SESIÓN
        ================================= */}

        <button
          type="button"
          className="btn-cerrar-sesion"
          onClick={cerrarSesion}
        >

          🚪 Cerrar sesión

        </button>

      </div>



      {/* =====================================
          MENÚ ADMINISTRACIÓN
      ===================================== */}

      <div className="admin-menu">


        {/* =================================
            PRODUCTOS
        ================================= */}

        <Link
          to="/admin/productos"
          className="admin-card"
        >

          <div className="admin-card-icon">
            📦
          </div>

          <div>

            <h2>
              Productos
            </h2>

            <p>
              Agregar, editar y eliminar productos.
            </p>

          </div>

        </Link>



        {/* =================================
            CARRUSEL
        ================================= */}

        <Link
          to="/admin/carousel"
          className="admin-card"
        >

          <div className="admin-card-icon">
            🎞️
          </div>

          <div>

            <h2>
              Carrusel
            </h2>

            <p>
              Administrar las imágenes del carrusel.
            </p>

          </div>

        </Link>



        {/* =================================
            FONDOS
        ================================= */}

        <Link
          to="/admin/fondos"
          className="admin-card"
        >

          <div className="admin-card-icon">
            🎨
          </div>

          <div>

            <h2>
              Fondos
            </h2>

            <p>
              Cambiar y administrar los fondos de inicio.
            </p>

          </div>

        </Link>


      </div>



      {/* =====================================
          VOLVER A LA TIENDA
      ===================================== */}

      <div className="admin-volver">

        <Link
          to="/"
          className="btn-volver"
        >

          ← Volver a la tienda

        </Link>

      </div>


    </div>

  );

}


export default Admin;