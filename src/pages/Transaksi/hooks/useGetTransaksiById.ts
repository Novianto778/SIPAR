import { useQuery } from '@tanstack/react-query';
import { supabase } from 'lib/supabaseClient';

export const getTransaksiById = async (id: number) => {
  let { data } = await supabase
    .from('transaksi')
    .select(`*, transaksi_detail: id_transaksi(*, motor: id_motor(*))`)
    .eq('id_transaksi', id)
    .single();

  return data;
};

export default function useGetTransaksiById(id: number) {
  return useQuery(['transaksi', id], () => getTransaksiById(id));
}
