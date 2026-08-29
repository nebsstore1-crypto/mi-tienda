import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Inicio from "./pages/Inicio";

import Admin from "./pages/Admin";
import AdminProductos from "./pages/AdminProductos";
import AdminCarousel from "./pages/AdminCarousel";
import AdminFondos from "./pages/AdminFondos";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* =====================================
            PÁGINA PRINCIPAL
        ===================================== */}

        <Route path="/" element={<Layout />}>

          <Route
            index
            element={<Inicio />}
          />

        </Route>


        {/* =====================================
            ADMINISTRACIÓN
        ===================================== */}

        <Route
          path="/admin"
          element={<Admin />}
        />

        <Route
          path="/admin/productos"
          element={<AdminProductos />}
        />

        <Route
          path="/admin/carousel"
          element={<AdminCarousel />}
        />

        <Route
          path="/admin/fondos"
          element={<AdminFondos />}
        />

      </Routes>

    </BrowserRouter>

  );

}


export default App;