import { useQuery } from '@tanstack/react-query';
import { supabase } from 'lib/supabaseClient';

export const getTransaksi = async () => {
  let { data } = await supabase
    .from('transaksi')
    .select(
      `*, transaksi_detail: id_transaksi(lama_sewa, id_motor, denda, motor: id_motor(harga))`
    )
    .order('id_transaksi', { ascending: false });

  return data;
};

export default function useTransaksi() {
  return useQuery(['transaksi'], getTransaksi);
}
