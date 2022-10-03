import { useQuery } from '@tanstack/react-query';
import { supabase } from 'lib/supabaseClient';

export const getJumlahTransaksi = async () => {
  let { count } = await supabase
    .from('transaksi')
    .select('*', { count: 'exact' });

  return count;
};

export const useJumlahTransaksi = () => {
  return useQuery(['jumlahTransaksi'], getJumlahTransaksi);
};
