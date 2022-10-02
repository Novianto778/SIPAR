import { useQuery } from '@tanstack/react-query';
import { supabase } from 'lib/supabaseClient';

export const getService = async () => {
  let { data } = await supabase
    .from('service')
    .select(`*, motor: id_motor(*)`)
    .order('id_service', { ascending: true });

  return data;
};

export default function useService() {
  return useQuery(['service'], getService);
}
