import { useQuery } from '@tanstack/react-query';
import { supabase } from 'lib/supabaseClient';

interface Props {
  userId?: string;
}

const getUser = async ({ userId }: Props) => {
  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('id', userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error('User not found');
  }

  return data;
};

export default function useUser() {
  const user = supabase.auth.user();
  return useQuery(['user'], () => getUser({ userId: user?.id }));
}
