import { supabase } from "../lib/supabase";


/* ==========================================
   OBTENER TODOS LOS FONDOS
========================================== */

export async function obtenerFondos() {

  const { data, error } = await supabase
    .from("fondo")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    throw error;
  }

  return data || [];
}


/* ==========================================
   OBTENER FONDO ACTIVO
========================================== */

export async function obtenerFondo() {

  const { data, error } = await supabase
    .from("fondo")
    .select("*")
    .eq("activo", true)
    .order("id", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}


/* ==========================================
   AGREGAR NUEVO FONDO
========================================== */

export async function agregarFondo(imagen) {

  // Desactivar el fondo que estaba activo

  const { error: errorActualizar } = await supabase
    .from("fondo")
    .update({
      activo: false
    })
    .eq("activo", true);

  if (errorActualizar) {
    throw errorActualizar;
  }


  // Crear nuevo fondo

  const { data, error } = await supabase
    .from("fondo")
    .insert([
      {
        imagen: imagen,
        activo: true
      }
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}


/* ==========================================
   ACTIVAR UN FONDO EXISTENTE
========================================== */

export async function activarFondo(id) {

  // Primero desactivar todos

  const { error: errorDesactivar } = await supabase
    .from("fondo")
    .update({
      activo: false
    })
    .eq("activo", true);

  if (errorDesactivar) {
    throw errorDesactivar;
  }


  // Activar el seleccionado

  const { data, error } = await supabase
    .from("fondo")
    .update({
      activo: true
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}


/* ==========================================
   ELIMINAR FONDO
========================================== */

export async function eliminarFondo(id) {

  const { data, error } = await supabase
    .from("fondo")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    throw error;
  }

  console.log("Registro eliminado:", data);

  return data;

}