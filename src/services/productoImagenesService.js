import { supabase } from "../lib/supabase";


// ==========================================
// OBTENER IMÁGENES
// ==========================================

export async function obtenerImagenesProducto(productoId) {

  const { data, error } = await supabase
    .from("producto_imagenes")
    .select("*")
    .eq("producto_id", productoId)
    .order("orden", {
      ascending: true
    });

  if (error) throw error;

  return data;

}


// ==========================================
// AGREGAR IMAGEN
// ==========================================

export async function agregarImagenProducto(
  productoId,
  imagen,
  orden = 1
) {

  const { data, error } = await supabase
    .from("producto_imagenes")
    .insert([
      {
        producto_id: productoId,
        imagen: imagen,
        orden: orden
      }
    ])
    .select()
    .single();

  if (error) throw error;

  return data;

}


// ==========================================
// ELIMINAR IMAGEN
// ==========================================

export async function eliminarImagenProducto(id) {

  const { error } = await supabase
    .from("producto_imagenes")
    .delete()
    .eq("id", id);

  if (error) throw error;

}