import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from 'lib/supabaseClient';

interface Props {
  email: string;
  password: string;
}

export const addUser = async ({ email, password }: Props) => {
  let { error } = await supabase.auth.api.createUser({
    email,
    password,
  });

  if (error) {
    console.log(error);
  }
};

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation(['users'], addUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });
};
