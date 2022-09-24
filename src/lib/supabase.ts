import { Motor } from 'types/motor';
import { supabase } from './supabaseClient';

export async function logout() {
  await supabase.auth.signOut();
}

export async function insertDataToTable(table_name: string, tableData: Motor) {
  const { data, error } = await supabase.from(table_name).insert(tableData);
  return { data, error };
}

export async function uploadImage(bucket: string, path: string, image: File) {
  try {
    const { error } = await supabase.storage.from(bucket).upload(path, image);

    if (error) throw error;
  } catch (error) {
    alert(error);
  }
}
