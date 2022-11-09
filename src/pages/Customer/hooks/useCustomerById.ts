import { useQuery } from '@tanstack/react-query';
import { supabase } from 'lib/supabaseClient';

export const getCustomerById = async (id: string) => {
    const { data } = await supabase
        .from('customer')
        .select()
        .eq('customer_id', id)
        .single();
    return data;
};

export const useCustomerById = (id: string) => {
    return useQuery(['customer', id], () => getCustomerById(id));
};
