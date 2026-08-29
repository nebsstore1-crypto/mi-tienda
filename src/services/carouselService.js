import { supabase } from "../lib/supabase";


// ==========================================
// OBTENER IMÁGENES DEL CARRUSEL
// ==========================================

export async function obtenerCarousel() {

  const { data, error } = await supabase
    .from("carousel")
    .select("*")
    .eq("visible", true)
    .order("orden", { ascending: true });

  if (error) throw error;

  return data;
}


// ==========================================
// AGREGAR NUEVA IMAGEN
// ==========================================

export async function agregarImagen(imagen) {

  // Buscar la última posición utilizada

  const { data, error } = await supabase
    .from("carousel")
    .select("orden")
    .order("orden", { ascending: false })
    .limit(1);

  if (error) throw error;


  let nuevoOrden = 1;

  if (data && data.length > 0) {

    nuevoOrden = data[0].orden + 1;

  }


  const { error: errorInsertar } = await supabase
    .from("carousel")
    .insert([
      {
        imagen: imagen,
        orden: nuevoOrden,
        visible: true
      }
    ]);

  if (errorInsertar) throw errorInsertar;

}


// ==========================================
// ELIMINAR IMAGEN
// ==========================================

export async function eliminarImagen(id) {

  const { error } = await supabase
    .from("carousel")
    .delete()
    .eq("id", id);

  if (error) throw error;

}


// ==========================================
// ACTUALIZAR ORDEN
// ==========================================

export async function actualizarOrden(id, nuevoOrden) {

  const { error } = await supabase
    .from("carousel")
    .update({
      orden: nuevoOrden
    })
    .eq("id", id);

  if (error) throw error;

}


// ==========================================
// MOVER IMAGEN
// ==========================================

export async function moverImagen(id, direccion) {

  // Obtener todas las imágenes

  const imagenes = await obtenerCarousel();


  // Buscar posición actual

  const posicionActual =
    imagenes.findIndex(
      (imagen) => imagen.id === id
    );


  if (posicionActual === -1) {

    throw new Error(
      "No se encontró la imagen."
    );

  }


  // Calcular nueva posición

  const nuevaPosicion =
    direccion === "arriba"
      ? posicionActual - 1
      : posicionActual + 1;


  // No permitir salir de los límites

  if (
    nuevaPosicion < 0 ||
    nuevaPosicion >= imagenes.length
  ) {

    return;

  }


  const imagenActual =
    imagenes[posicionActual];

  const imagenIntercambio =
    imagenes[nuevaPosicion];


  /*
    Usamos temporalmente -1 para evitar
    que dos imágenes tengan el mismo orden
    durante el intercambio.
  */

  await actualizarOrden(
    imagenActual.id,
    -1
  );


  await actualizarOrden(
    imagenIntercambio.id,
    imagenActual.orden
  );


  await actualizarOrden(
    imagenActual.id,
    imagenIntercambio.orden
  );

}