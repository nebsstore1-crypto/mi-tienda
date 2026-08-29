import { supabase } from "../lib/supabase";


/* ==========================================
   SUBIR IMAGEN
========================================== */

export async function subirImagenFondo(file) {

  if (!file) {

    throw new Error(
      "No se seleccionó ninguna imagen"
    );

  }


  const nombreArchivo =
    `${Date.now()}-${file.name}`;


  const { error } = await supabase.storage
    .from("fondos")
    .upload(nombreArchivo, file);


  if (error) {

    throw error;

  }


  const { data } = supabase.storage
    .from("fondos")
    .getPublicUrl(nombreArchivo);


  return data.publicUrl;

}


/* ==========================================
   ELIMINAR IMAGEN DEL STORAGE
========================================== */

export async function eliminarImagenFondo(url) {

  if (!url) return;


  try {

    // Obtener solamente el nombre del archivo
    // desde la URL pública

    const partes = url.split("/fondos/");

    if (partes.length < 2) {

      console.warn(
        "No se pudo obtener el nombre del archivo"
      );

      return;

    }


    const nombreArchivo =
      decodeURIComponent(partes[1]);


    const { error } = await supabase.storage
      .from("fondos")
      .remove([
        nombreArchivo
      ]);


    if (error) {

      throw error;

    }

  } catch (error) {

    console.error(
      "Error eliminando imagen:",
      error
    );

    throw error;

  }

}