import { useQuery } from '@tanstack/react-query';
import { supabase } from 'lib/supabaseClient';

export const getTransaksiDetail = async (id: string) => {
  let { data } = await supabase
    .from('transaksi_detail')
    .select(`*, motor: id_motor (*)`)
    .eq('id_transaksi', id);

  return data;
};

export default function useTransaksiDetail(id: string) {
  return useQuery(['transaksi', id], () => getTransaksiDetail(id), {
    enabled: !!id,
  });
}
