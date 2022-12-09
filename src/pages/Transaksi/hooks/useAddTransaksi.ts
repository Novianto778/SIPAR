import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from 'lib/supabaseClient';
import { Motor } from 'types/motor';
import { Transaksi, TransaksiDetail } from 'types/transaksi';

interface Props {
    transaksi: Transaksi;
    transaksiDetail: (TransaksiDetail & {
        motor?: Motor;
    })[];
}
export const addTransaksi = async ({ transaksi, transaksiDetail }: Props) => {
    // const {data: motor } = await supabase.from('motor').select('*');
    // const total = transaksiDetail.reduce((acc, item) => {
    //   return acc + item.lama_sewa;
    // }, 0);
    let { data } = await supabase.from('transaksi').insert([transaksi]);
    const id_transaksi = data![0].id_transaksi;

    const newTransaksiDetail = transaksiDetail.map((item) => {
        return {
            ...item,
            id_transaksi,
            id_motor: item.id_motor.value
        };
    });

    transaksiDetail.forEach(async (item) => {
        const data = await supabase.rpc('decrement_stok', {
            id: item.id_motor.value
        });
        console.log(data);
    });

    let { data: dataDetail } = await supabase
        .from('transaksi_detail')
        .insert([...newTransaksiDetail]);

    const { data: total } = await supabase.rpc('get_transaksi_detail_total', {
        selected_id: 56
    });

    let { error } = await supabase
        .from('transaksi_detail')
        .update({
            total
        })
        .eq('id', dataDetail![0].id);

    if (transaksi.no_telp.slice(0, 3) === '628') {
        await fetch(
            'https://sendtalk-api.taptalk.io/api/v1/message/send_whatsapp',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'API-Key': process.env.REACT_APP_SENDTALK_API_KEY!
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
        `
                })
            }
        );
    }

    return { data, dataDetail };
};

export default function useAddTransaksi() {
    const queryClient = useQueryClient();
    return useMutation(addTransaksi, {
        onSuccess: () => {
            return queryClient.invalidateQueries(['motor']);
        }
    });
}
