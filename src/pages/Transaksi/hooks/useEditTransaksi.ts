import { useMutation } from '@tanstack/react-query';
import { supabase } from 'lib/supabaseClient';
import { Transaksi } from 'types/transaksi';

interface Props {
  transaksi: Transaksi;
}
export const editTransaksi = async ({ transaksi }: Props) => {
  let { data } = await supabase
    .from('transaksi')
    .update([transaksi])
    .eq('id_transaksi', transaksi.id_transaksi);

  return { data };
};

export default function useEditTransaksi() {
  return useMutation(editTransaksi);
}
