import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

import "../../styles/whatsapp.css";


function Layout() {

  return (

    <div className="layout">


      {/* ==========================================
          NAVBAR
      ========================================== */}

      <Navbar />


      {/* ==========================================
          CONTENIDO DE LAS PÁGINAS
      ========================================== */}

      <main className="main-content">

        <Outlet />

      </main>


      {/* ==========================================
          FOOTER
      ========================================== */}

      <Footer />


      {/* ==========================================
          WHATSAPP FLOTANTE
      ========================================== */}

      <a
        href="https://wa.me/573228593252"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-flotante"
        aria-label="Contactar por WhatsApp"
      >

        <i className="fa-brands fa-whatsapp"></i>

      </a>


    </div>

  );

}


export default Layout;