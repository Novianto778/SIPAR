import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from 'lib/supabaseClient';

interface Props {
    id: number;
    denda: number;
}

export const addDenda = async ({ id, denda }: Props) => {
    const { data } = await supabase
        .from('transaksi_detail')
        .update({ denda })
        .eq('id', id);

    return data;
};

export default function useAddDenda() {
    const queryClient = useQueryClient();
    return useMutation(addDenda, {
        onSuccess: () => {
            return queryClient.invalidateQueries(['transaksi']);
        }
    });
}
