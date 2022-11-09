import { useMutation } from '@tanstack/react-query';
import { supabase } from 'lib/supabaseClient';

export const deleteTransaksi = async (id: number) => {
    await supabase.from('transaksi_detail').delete().eq('id_transaksi', id);
    const { error } = await supabase
        .from('transaksi')
        .delete()
        .eq('id_transaksi', id);

    if (error) {
        throw new Error(error.message);
    }
};

const useDeleteTransaksi = () => {
    return useMutation(deleteTransaksi);
};

export default useDeleteTransaksi;
