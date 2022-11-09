import { useQuery } from '@tanstack/react-query';
import { supabase } from 'lib/supabaseClient';

export const getCustomer = async () => {
    let { data } = await supabase
        .from('customer')
        .select('*')
        .eq('status', true);

    return data;
};

export default function useCustomer() {
    return useQuery(['customer'], getCustomer);
}
