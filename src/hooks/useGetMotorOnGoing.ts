import { useQuery } from '@tanstack/react-query';
import { supabase } from 'lib/supabaseClient';
import toast from 'react-hot-toast';

const getMotorOnGoing = async () => {
  const { data, error } = await supabase.rpc('get_motor_ongoing').single();

  if (error) {
    toast.error(error.message);
  }

  if (!data) {
    toast.error('Motor On Going not found');
  }

  return data;
};

export default function useGetMotorOnGoing() {
  return useQuery(['transaksi', { type: 'pending' }], getMotorOnGoing);
}
