import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from 'lib/supabaseClient';

interface Props {
  email: string;
  password: string;
  username: string;
}

export const addUser = async ({ email, password, username }: Props) => {
  let { data, error } = await supabase.auth.api.createUser({
    email,
    password,
    email_confirm: true,
  });

  await supabase.from('users').update({ username }).eq('id', data?.id);

  if (error) {
    console.log(error);
  }
};

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation(addUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });
};
