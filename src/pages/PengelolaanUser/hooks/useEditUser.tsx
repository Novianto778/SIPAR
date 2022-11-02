import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from 'lib/supabaseClient';

interface Props {
  id: string;
  username: string;
}

export const editUser = async ({ id, username }: Props) => {
  await supabase.from('users').update({ username }).eq('id', id);
};

export const useEditUser = () => {
  const queryClient = useQueryClient();
  return useMutation(editUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });
};
