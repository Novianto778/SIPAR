import { useMutation } from '@tanstack/react-query';
import { supabase } from 'lib/supabaseClient';

export const changeStatus = async (id: number) => {
  let { data } = await supabase
    .from('service')
    .update({ status: 'Completed' })
    .eq('id_service', id);

  return data;
};

export default function useChangeStatus() {
  return useMutation(changeStatus);
}
