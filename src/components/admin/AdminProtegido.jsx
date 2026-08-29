import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

function AdminProtegido({ children }) {

  const [cargando, setCargando] = useState(true);
  const [sesion, setSesion] = useState(null);

  // ==========================================
  // TIEMPO MÁXIMO DE INACTIVIDAD
  // 5 MINUTOS = 300000 MILISEGUNDOS
  // ==========================================

  const TIEMPO_INACTIVIDAD = 5 * 60 * 1000;


  // ==========================================
  // VERIFICAR SESIÓN
  // ==========================================

  useEffect(() => {

    async function verificarSesion() {

      const { data, error } =
        await supabase.auth.getSession();

      if (error) {

        console.error(
          "Error verificando sesión:",
          error
        );

        setSesion(null);

      } else {

        setSesion(data.session);

      }

      setCargando(false);

    }

    verificarSesion();


    // ========================================
    // ESCUCHAR CAMBIOS DE SESIÓN
    // ========================================

    const {
      data: authListener
    } = supabase.auth.onAuthStateChange(
      (_event, sessionActual) => {

        setSesion(sessionActual);

        setCargando(false);

      }
    );


    // ========================================
    // LIMPIAR LISTENER
    // ========================================

    return () => {

      authListener.subscription.unsubscribe();

    };

  }, []);


  // ==========================================
  // CERRAR SESIÓN POR INACTIVIDAD
  // ==========================================

  useEffect(() => {

    // Si todavía no sabemos si existe sesión,
    // no hacemos nada.

    if (cargando || !sesion) {
      return;
    }


    let temporizador;


    // ========================================
    // CERRAR SESIÓN
    // ========================================

    async function cerrarSesionPorInactividad() {

      console.log(
        "Sesión cerrada por inactividad."
      );

      await supabase.auth.signOut();

    }


    // ========================================
    // REINICIAR TEMPORIZADOR
    // ========================================

    function reiniciarTemporizador() {

      clearTimeout(temporizador);

      temporizador = setTimeout(
        cerrarSesionPorInactividad,
        TIEMPO_INACTIVIDAD
      );

    }


    // ========================================
    // ACTIVIDAD DEL USUARIO
    // ========================================

    const eventos = [

      "mousedown",
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
      "click"

    ];


    eventos.forEach((evento) => {

      window.addEventListener(
        evento,
        reiniciarTemporizador
      );

    });


    // ========================================
    // INICIAR TEMPORIZADOR
    // ========================================

    reiniciarTemporizador();


    // ========================================
    // LIMPIAR
    // ========================================

    return () => {

      clearTimeout(temporizador);

      eventos.forEach((evento) => {

        window.removeEventListener(
          evento,
          reiniciarTemporizador
        );

      });

    };

  }, [cargando, sesion]);


  // ==========================================
  // CARGANDO
  // ==========================================

  if (cargando) {

    return (
      <div className="admin-cargando">

        <h2>
          Verificando acceso...
        </h2>

      </div>
    );

  }


  // ==========================================
  // NO HAY SESIÓN
  // ==========================================

  if (!sesion) {

    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );

  }


  // ==========================================
  // SESIÓN CORRECTA
  // ==========================================

  return children;

}

export default AdminProtegido;