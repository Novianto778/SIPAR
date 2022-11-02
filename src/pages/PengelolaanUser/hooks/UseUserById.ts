import { useQuery } from '@tanstack/react-query';
import { supabase } from 'lib/supabaseClient';

export const getUserById = async (uuid: string) => {
  let { data } = await supabase
    .from('users')
    .select('*')
    .eq('id', uuid)
    .single();

  return data;
};

export const useGetUserById = (uuid: string) => {
  return useQuery(['users', uuid], () => getUserById(uuid));
};
