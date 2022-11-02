import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from 'lib/supabaseClient';

export const deleteUser = async (uuid: string) => {
  let { error } = await supabase.auth.api.deleteUser(uuid);
  await supabase.from('users').delete().eq('id', uuid);

  if (error) {
    console.log(error);
  }
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });
};
