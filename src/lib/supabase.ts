import { Motor } from 'types/motor';
import { supabase } from './supabaseClient';

export async function logout() {
  await supabase.auth.signOut();
}

export async function insertDataToTable(table_name: string, tableData: Motor) {
  const { data, error } = await supabase.from(table_name).insert(tableData);
  return { data, error };
}

export async function updateDataToTable(
  table_name: string,
  tableData: Motor,
  updateKey: string,
  id: string
) {
  const { data, error } = await supabase
    .from(table_name)
    .update(tableData)
    .eq(updateKey, id);
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

export async function deleteImage(bucket: string, path: string) {
  try {
    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error) throw error;
  } catch (error) {
    alert(error);
  }
}

export async function deleteRow(table_name: string, id_motor: number) {
  const { data, error } = await supabase
    .from(table_name)
    .delete()
    .match({ id_motor });
  return { data, error };
}
