import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

function Navbar() {

  const [menuAbierto, setMenuAbierto] = useState(false);
  const [categoriasAbiertas, setCategoriasAbiertas] = useState(false);

  // ==========================================
  // CERRAR MENÚ
  // ==========================================

  function cerrarMenu() {

    setMenuAbierto(false);
    setCategoriasAbiertas(false);

  }

  // ==========================================
  // ABRIR / CERRAR CATEGORÍAS
  // ==========================================

  function toggleCategorias(e) {

    e.preventDefault();

    setCategoriasAbiertas(
      !categoriasAbiertas
    );

  }

  return (

    <header className="navbar">

      <div className="navbar-container">


        {/* =====================================
            LOGO
        ===================================== */}

        <div className="logo">

          <Link
            to="/"
            onClick={cerrarMenu}
          >

            <img
              src={logo}
              alt="NESB Store"
              className="logo-img"
            />

            <span className="logo-text">
              NESB
            </span>

          </Link>

        </div>


        {/* =====================================
            BOTÓN HAMBURGUESA
        ===================================== */}

        <button
          type="button"
          className={`menu-toggle ${
            menuAbierto ? "activo" : ""
          }`}
          onClick={() =>
            setMenuAbierto(!menuAbierto)
          }
          aria-label="Abrir menú"
        >

          <span></span>
          <span></span>
          <span></span>

        </button>


        {/* =====================================
            MENÚ
        ===================================== */}

        <nav
          className={`menu ${
            menuAbierto
              ? "menu-abierto"
              : ""
          }`}
        >


          {/* =================================
              INICIO
          ================================= */}

          <Link
            to="/"
            onClick={cerrarMenu}
          >
            Inicio
          </Link>


          {/* =================================
              CATEGORÍAS
          ================================= */}

          <div
            className={`dropdown ${
              categoriasAbiertas
                ? "categoria-abierta"
                : ""
            }`}
          >

          <div className="categoria-boton">

  {/* CATEGORÍAS → página general */}
  <Link
    to="/categorias"
    className="dropbtn"
    onClick={cerrarMenu}
  >
    Categorías
  </Link>

  {/* FLECHA → abre el desplegable */}
  <button
    type="button"
    className="flecha-btn"
    onClick={toggleCategorias}
    aria-label="Mostrar categorías"
  >
    <span
      className={
        categoriasAbiertas
          ? "flecha girada"
          : "flecha"
      }
    >
      ▼
    </span>
  </button>

</div>


            {/* SUBMENÚ */}

            <div className="dropdown-content">

              <Link
                to="/hombre"
                onClick={cerrarMenu}
              >
                 Hombre
              </Link>

              <Link
                to="/mujer"
                onClick={cerrarMenu}
              >
                Mujer
              </Link>

              <Link
                to="/nino"
                onClick={cerrarMenu}
              >
                 Niño
              </Link>

            </div>

          </div>


          {/* =================================
              NOVEDADES
          ================================= */}

          <Link
            to="/destacados"
            onClick={cerrarMenu}
          >
            Novedades
          </Link>


          {/* =================================
              CONTACTO
          ================================= */}

          <Link
            to="/informacion"
            onClick={cerrarMenu}
          >
            Información
          </Link>


          {/* =================================
              ADMIN MÓVIL
          ================================= */}

          <Link
            to="/admin"
            className="admin-btn admin-mobile"
            onClick={cerrarMenu}
          >
            ⚙️ Admin
          </Link>


        </nav>



        {/* =====================================
            ADMIN DESKTOP
        ===================================== */}

        <Link
          to="/admin"
          className="admin-btn admin-desktop"
          onClick={cerrarMenu}
        >
          ⚙️ Admin
        </Link>


      </div>

    </header>

  );

}

export default Navbar;