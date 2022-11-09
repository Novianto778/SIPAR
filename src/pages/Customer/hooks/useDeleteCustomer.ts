import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from 'lib/supabaseClient';

export const deleteCustomer = async (id: string) => {
    const { error } = await supabase
        .from('customer')
        .update({ status: false })
        .eq('customer_id', id);
    if (error) throw error;
};

export const useDeleteCustomer = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteCustomer, {
        onSuccess: () => {
            return queryClient.invalidateQueries(['customer']);
        }
    });
};
