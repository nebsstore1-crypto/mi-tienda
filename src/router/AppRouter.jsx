import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";


// ==========================================
// PÁGINAS PRINCIPALES
// ==========================================

import Inicio from "../pages/Inicio";
import Catalogo from "../pages/Catalogo";
import Hombre from "../pages/Hombre";
import Mujer from "../pages/Mujer";
import Nino from "../pages/Nino";
import Informacion from "../pages/Informacion";
import Destacados from "../pages/Destacados";
import Categorias from "../pages/Categorias";

import Producto from "../pages/Producto";


// ==========================================
// ADMIN
// ==========================================

import Login from "../pages/Login";

import Admin from "../pages/Admin";
import AdminProductos from "../pages/AdminProductos";
import AdminCarousel from "../pages/AdminCarousel";
import AdminFondos from "../pages/AdminFondos";


// ==========================================
// PROTECCIÓN ADMIN
// ==========================================

import AdminProtegido from "../components/admin/AdminProtegido";


function AppRouter() {

  return (

    <BrowserRouter>

      <Routes>


        {/* =====================================
            PÁGINA PRINCIPAL
        ===================================== */}

        <Route
          path="/"
          element={<Layout />}
        >

          {/* INICIO */}

          <Route
            index
            element={<Inicio />}
          />


          {/* CATÁLOGO */}

          <Route
            path="catalogo"
            element={<Catalogo />}
          />


          {/* CATEGORÍAS */}

          <Route
            path="categorias"
            element={<Categorias />}
          />


          {/* DESTACADOS */}

          <Route
            path="destacados"
            element={<Destacados />}
          />


          {/* HOMBRE */}

          <Route
            path="hombre"
            element={<Hombre />}
          />


          {/* MUJER */}

          <Route
            path="mujer"
            element={<Mujer />}
          />


          {/* NIÑO */}

          <Route
            path="nino"
            element={<Nino />}
          />


          {/* INFORMACIÓN */}

          <Route
            path="informacion"
            element={<Informacion />}
          />


          {/* PRODUCTO */}

          <Route
            path="producto/:id"
            element={<Producto />}
          />

        </Route>



        {/* =====================================
            LOGIN ADMIN
            ESTA RUTA NO ESTÁ PROTEGIDA
        ===================================== */}

        <Route
          path="/admin/login"
          element={<Login />}

        />



        {/* =====================================
            ADMINISTRACIÓN PROTEGIDA
        ===================================== */}

        <Route
          path="/admin"
          element={
            <AdminProtegido>
              <Admin />
            </AdminProtegido>
          }
        />


        {/* =====================================
            ADMIN PRODUCTOS
        ===================================== */}

        <Route
          path="/admin/productos"
          element={
            <AdminProtegido>
              <AdminProductos />
            </AdminProtegido>
          }
        />


        {/* =====================================
            ADMIN CARRUSEL
        ===================================== */}

        <Route
          path="/admin/carousel"
          element={
            <AdminProtegido>
              <AdminCarousel />
            </AdminProtegido>
          }
        />


        {/* =====================================
            ADMIN FONDOS
        ===================================== */}

        <Route
          path="/admin/fondos"
          element={
            <AdminProtegido>
              <AdminFondos />
            </AdminProtegido>
          }
        />


      </Routes>

    </BrowserRouter>

  );

}

export default AppRouter;