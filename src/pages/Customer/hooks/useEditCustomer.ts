import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTES } from 'constants/routes';
import { supabase } from 'lib/supabaseClient';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Customer } from 'types/customer';

interface Props {
    id: string;
    customer: Omit<Customer, 'customer_id'>;
}

export const editCustomer = async ({ id, customer }: Props) => {
    const { error } = await supabase
        .from('customer')
        .update(customer)
        .eq('customer_id', id);
    if (error) throw error;
};

export const useEditCustomer = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation(editCustomer, {
        onSuccess: () => {
            return queryClient.invalidateQueries(['customer']);
        }
        // onMutate: async (data: Props) => {
        //     await queryClient.cancelQueries(['customer']);
        //     const previousCustomer = queryClient.getQueryData(['customer']);
        //     queryClient.setQueryData(['customer'], (old: any) => {
        //         return old.map((customer: any) =>
        //             customer.customer_id === data.id
        //                 ? { ...customer, ...data.customer }
        //                 : customer
        //         );
        //     });

        //     return { previousCustomer };
        // }
    });
};
