import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTES } from 'constants/routes';
import { supabase } from 'lib/supabaseClient';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Customer } from 'types/customer';

type CustomerInput = Omit<Customer, 'customer_id'>;
export const addCustomer = async (cust: CustomerInput) => {
    const { data } = await supabase.from('customer').insert(cust);

    return data;
};

export const useTambahCustomer = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation(addCustomer, {
        onSuccess: () => {
            return queryClient.invalidateQueries(['customer']);
        },
        // onMutate: async (newCust) => {
        //     // optimistic update
        //     await queryClient.cancelQueries(['customer']);
        //     const previousCust = queryClient.getQueryData(['customer']);
        //     if (!previousCust) return;
        //     queryClient.setQueryData(['customer'], (old: any) => [
        //         ...old,
        //         newCust
        //     ]);
        //     return { previousCust };
        // },
        onError(err: any) {
            toast.error(err.message);
        }
    });
};
