import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "../styles/login.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);


  // ==========================================
  // INICIAR SESIÓN
  // ==========================================

  async function iniciarSesion(e) {

    e.preventDefault();

    setError("");
    setCargando(true);

    try {

      const { error } =
        await supabase.auth.signInWithPassword({

          email: email,

          password: password

        });


      if (error) {

        throw error;

      }


      // ======================================
      // LOGIN CORRECTO
      // ======================================

      navigate("/admin");

    } catch (error) {

      console.error(error);

      setError(
        "Correo o contraseña incorrectos."
      );

    } finally {

      setCargando(false);

    }

  }


  return (

    <div className="login-container">

      <div className="login-box">

        <h1>
          🔐 Acceso Administrador
        </h1>


        <p className="login-subtitulo">
          Inicia sesión para acceder al panel
        </p>


        <form onSubmit={iniciarSesion}>


          {/* ==================================
              CORREO
          ================================== */}

          <label>
            Correo electrónico
          </label>

          <input
            type="email"
            placeholder="admin@nesb.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />


          {/* ==================================
              CONTRASEÑA
          ================================== */}

          <label>
            Contraseña
          </label>

          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />


          {/* ==================================
              ERROR
          ================================== */}

          {error && (

            <p className="login-error">
              ❌ {error}
            </p>

          )}


          {/* ==================================
              BOTÓN
          ================================== */}

          <button
            type="submit"
            disabled={cargando}
          >

            {cargando
              ? "Ingresando..."
              : "Iniciar sesión"
            }

          </button>


        </form>

      </div>

    </div>

  );

}

export default Login;