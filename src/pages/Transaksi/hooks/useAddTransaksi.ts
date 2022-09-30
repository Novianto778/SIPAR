import { useMutation } from '@tanstack/react-query';
import { supabase } from 'lib/supabaseClient';
import { Transaksi, TransaksiDetail } from 'types/transaksi';

interface Props {
  transaksi: Transaksi;
  transaksiDetail: TransaksiDetail[];
}
export const addTransaksi = async ({ transaksi, transaksiDetail }: Props) => {
  let { data } = await supabase.from('transaksi').insert([transaksi]);
  const id_transaksi = data![0].id_transaksi;

  const newTransaksiDetail = transaksiDetail.map((item) => ({
    ...item,
    id_transaksi,
    id_motor: item.id_motor.value,
  }));

  let { data: dataDetail } = await supabase
    .from('transaksi_detail')
    .insert([...newTransaksiDetail]);

  return { data, dataDetail };
};

export default function useAddTransaksi() {
  return useMutation(['transaksi'], addTransaksi);
}
