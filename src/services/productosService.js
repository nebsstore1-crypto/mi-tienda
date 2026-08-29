import { supabase } from "../lib/supabase";

// ==========================================
// OBTENER PRODUCTOS
// ==========================================

export async function obtenerProductos() {

  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw error;

  return data;
}


// ==========================================
// AGREGAR PRODUCTO
// ==========================================

export async function agregarProducto(producto) {

  const { data, error } = await supabase
    .from("productos")
    .insert([producto])
    .select()
    .single();

  if (error) {

    console.error(error);

    throw error;

  }

  return data;
}


// ==========================================
// EDITAR PRODUCTO
// ==========================================

export async function editarProducto(id, producto) {

  const { error } = await supabase
    .from("productos")
    .update(producto)
    .eq("id", id);

  if (error) throw error;

}


// ==========================================
// ELIMINAR PRODUCTO
// ==========================================

export async function eliminarProducto(id) {

  const { error } = await supabase
    .from("productos")
    .delete()
    .eq("id", id);

  if (error) throw error;

}


// ==========================================
// AGREGAR IMAGEN ADICIONAL
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
    .select();

  if (error) throw error;

  return data;

}


// ==========================================
// OBTENER IMÁGENES DE UN PRODUCTO
// ==========================================

export async function obtenerImagenesProducto(
  productoId
) {

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
// ELIMINAR IMAGEN ADICIONAL
// ==========================================

export async function eliminarImagenProducto(id) {

  const { error } = await supabase
    .from("producto_imagenes")
    .delete()
    .eq("id", id);

  if (error) throw error;

}


// ==========================================
// FORMATO DE PRECIO
// ==========================================

export function formatoPrecio(valor) {

  if (
    valor === null ||
    valor === undefined ||
    valor === ""
  ) {
    return "$0";
  }

  const numero = Number(
    String(valor).replace(/\./g, "").replace(/,/g, "")
  );

  if (isNaN(numero)) {
    return "$0";
  }

  return numero.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

}