import { supabase } from "../lib/supabase";


// ==========================================
// SUBIR IMAGEN
// ==========================================

export async function subirImagen(file) {

  const nombreArchivo =
    `${Date.now()}-${file.name}`;


  const { error } =
    await supabase.storage
      .from("productos")
      .upload(
        nombreArchivo,
        file
      );


  if (error) {

    throw error;

  }


  const { data } =
    supabase.storage
      .from("productos")
      .getPublicUrl(
        nombreArchivo
      );


  return data.publicUrl;

}


// ==========================================
// OBTENER RUTA DEL ARCHIVO
// ==========================================

export function obtenerRutaImagen(url) {

  if (!url) {

    return null;

  }


  const marcador =
    "/storage/v1/object/public/productos/";


  const posicion =
    url.indexOf(marcador);


  if (posicion === -1) {

    console.error(
      "❌ URL de imagen no válida:",
      url
    );

    return null;

  }


  const ruta =
    url.substring(
      posicion + marcador.length
    );


  return decodeURIComponent(
    ruta
  );

}


// ==========================================
// ELIMINAR IMAGEN DEL STORAGE
// ==========================================

export async function eliminarImagen(url) {

  const ruta =
    obtenerRutaImagen(url);


  if (!ruta) {

    return;

  }


  console.log(
    "🗑️ Eliminando archivo:",
    ruta
  );


  const { error } =
    await supabase.storage
      .from("productos")
      .remove([
        ruta
      ]);


  if (error) {

    console.error(
      "❌ Error eliminando imagen:",
      error
    );

    throw error;

  }


  console.log(
    "✅ Imagen eliminada:",
    ruta
  );

}