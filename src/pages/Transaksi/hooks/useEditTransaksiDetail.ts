import { useMutation } from '@tanstack/react-query';
import { supabase } from 'lib/supabaseClient';
import { TransaksiDetail } from 'types/transaksi';

interface Props {
  transaksiDetail: Omit<TransaksiDetail, 'id_motor'> & { id_motor: number };
  selectedId: number;
}
export const editTransaksiDetail = async ({
  transaksiDetail,
  selectedId,
}: Props) => {
  let { data } = await supabase
    .from('transaksi_detail')
    .update([transaksiDetail])
    .eq('id', selectedId)
    .single();

  return { data };
};

export default function useEditTransaksiDetail() {
  return useMutation(['transaksi'], editTransaksiDetail);
}
