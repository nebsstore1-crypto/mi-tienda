import { supabase } from "../lib/supabase";

export async function subirImagenCarousel(file) {

  const nombreArchivo = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("carousel")
    .upload(nombreArchivo, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("carousel")
    .getPublicUrl(nombreArchivo);

  return data.publicUrl;

}