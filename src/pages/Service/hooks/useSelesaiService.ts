import { useMutation } from '@tanstack/react-query';
import { supabase } from 'lib/supabaseClient';

interface Props {
  id: number;
  total: number;
}

export const selesaiService = async ({ id, total }: Props) => {
  let { data } = await supabase
    .from('service')
    .update({
      status: 'Completed',
      total_harga: total,
      tanggal_kembali: new Date(),
    })
    .eq('id_service', id);

  return data;
};

export default function useSelesaiService() {
  return useMutation(selesaiService);
}
