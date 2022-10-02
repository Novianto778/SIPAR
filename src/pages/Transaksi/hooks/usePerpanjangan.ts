import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from 'lib/supabaseClient';
import moment from 'moment';

interface Props {
  id: number;
  lama: number;
}

export const perpanjangSewa = async ({ id, lama }: Props) => {
  let { data: dataTransaksiDetail } = await supabase
    .from('transaksi_detail')
    .select('tanggal_selesai, lama_sewa')
    .eq('id', id)
    .single();

  const tanggal_setelah_perpanjang = moment(dataTransaksiDetail.tanggal_selesai)
    .add(lama, 'days')
    .toDate();

  const lamaSewa = dataTransaksiDetail.lama_sewa + lama;

  let { data } = await supabase
    .from('transaksi_detail')
    .update({
      tanggal_selesai: tanggal_setelah_perpanjang,
      lama_sewa: lamaSewa,
    })
    .eq('id', id)
    .single();

  return data;
};

export default function usePerpanjangSewa() {
  return useMutation(['transaksi'], perpanjangSewa);
}
