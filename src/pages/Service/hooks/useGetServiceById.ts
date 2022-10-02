import { useQuery } from '@tanstack/react-query';
import { supabase } from 'lib/supabaseClient';
import { Motor } from 'types/motor';
import { Service } from 'types/service';

export const getServiceById = async (id: number) => {
  let { data } = await supabase
    .from('service')
    .select(`*, motor: id_motor(*)`)
    .eq('id_service', id)
    .single();

  return data;
};

export default function useGetServiceById(id: number) {
  return useQuery<Service & { motor: Motor }>(['service', id], () =>
    getServiceById(id)
  );
}
