import { useQuery } from '@tanstack/react-query';
import { supabase } from 'lib/supabaseClient';

const getMotorById = async (id: string) => {
  let { data: motor, error } = await supabase
    .from('motor')
    .select('*')
    .eq('id_motor', id)
    .single();

  if (error) {
    throw error;
  }

  return motor;
};

export default function useMotorById(id: string) {
  return useQuery(['motor', id], () => getMotorById(id));
}
