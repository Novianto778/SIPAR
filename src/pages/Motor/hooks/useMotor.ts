import { useQuery } from '@tanstack/react-query';
import { supabase } from 'lib/supabaseClient';

export const getMotor = async () => {
  let { data: motor, error } = await supabase.from('motor').select('*');

  if (error) {
    throw error;
  }

  return motor;
};

export default function useMotor() {
  return useQuery(['motor'], getMotor);
}
