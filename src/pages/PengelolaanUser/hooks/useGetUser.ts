import { useQuery } from '@tanstack/react-query';
import { supabase } from 'lib/supabaseClient';

export const getUser = async () => {
  let { data } = await supabase.from('users').select('*');

  return data;
};

export const useGetUser = () => {
  return useQuery(['users'], getUser);
};
