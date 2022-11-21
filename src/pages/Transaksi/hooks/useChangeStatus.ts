import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from 'lib/supabaseClient';

export const changeStatus = async (id: number) => {
    let { data } = await supabase
        .from('transaksi')
        .update({ status: 'Completed' })
        .eq('id_transaksi', id);

    await supabase
        .from('transaksi_detail')
        .update({ status: 'Completed' })
        .eq('id_transaksi', id);

    return data;
};

export default function useChangeStatus() {
    const queryClient = useQueryClient();
    return useMutation(changeStatus, {
        onSuccess: () => {
            return queryClient.invalidateQueries(['transaksi']);
        },

        onMutate: async (id: number) => {
            await queryClient.cancelQueries(['transaksi']);
            const previousTransaksi = queryClient.getQueryData(['transaksi']);
            queryClient.setQueryData(['transaksi'], (old: any) => {
                if (old.id_transaksi === id) {
                    return {
                        ...old,
                        status: 'Completed'
                    };
                }
            });

            return { previousTransaksi };
        }
    });
}
