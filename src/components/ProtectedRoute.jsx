import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function ProtectedRoute({ children }) {

  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);


  // ==========================================
  // COMPROBAR SESIÓN
  // ==========================================

  useEffect(() => {

    async function comprobarSesion() {

      const {
        data: { session }
      } = await supabase.auth.getSession();


      setUsuario(session?.user ?? null);

      setCargando(false);

    }


    comprobarSesion();


    // ========================================
    // ESCUCHAR CAMBIOS DE SESIÓN
    // ========================================

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {

        setUsuario(session?.user ?? null);

      }
    );


    return () => {

      subscription.unsubscribe();

    };

  }, []);


  // ==========================================
  // CARGANDO
  // ==========================================

  if (cargando) {

    return (

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#111",
          color: "white"
        }}
      >

        <h2>
          Verificando acceso...
        </h2>

      </div>

    );

  }


  // ==========================================
  // NO AUTENTICADO
  // ==========================================

  if (!usuario) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  // ==========================================
  // AUTENTICADO
  // ==========================================

  return children;

}

export default ProtectedRoute;