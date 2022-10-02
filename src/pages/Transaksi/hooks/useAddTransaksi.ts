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

  await fetch('https://sendtalk-api.taptalk.io/api/v1/message/send_whatsapp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API-Key':
        '969c2c7ede7c90617154823df64e732196bfd2bc711aaa673848d0539ba507b2',
    },
    body: JSON.stringify({
      phone: transaksi.no_telp,
      messageType: 'text',
      body: `Nota Transaksi: ${id_transaksi}
      Nama: ${transaksi.nama}
      Alamat: ${transaksi.alamat}
      No. HP: ${transaksi.no_telp}
      Tanggal Transaksi: ${transaksi.tanggal.toDateString()}
      Detail Transaksi:
      ${transaksiDetail?.map(
        (item) => `
      Nama Motor: ${item.plat_motor}
      Harga: ${item.id_motor.label}
      Lama Sewa: ${item.lama_sewa}
      `
      )}
      `,
    }),
  });

  return { data, dataDetail };
};

export default function useAddTransaksi() {
  return useMutation(['transaksi'], addTransaksi);
}
