import { useQuery } from '@tanstack/react-query';
import { supabase } from 'lib/supabaseClient';

export const getTransaksiDetailById = async (id: number) => {
  let { data } = await supabase
    .from('transaksi_detail')
    .select(`*, motor: id_motor(*)`)
    .eq('id', id)
    .single();

  return data;
};

export default function useGetTransaksiDetailById(id: number) {
  return useQuery(['transaksi', id], () => getTransaksiDetailById(id));
}
