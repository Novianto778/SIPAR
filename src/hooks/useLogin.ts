import { ApiError, User } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';
import { supabase } from 'lib/supabaseClient';

interface Props {
  email: string;
  password: string;
}

interface Api {
  user?: User | null;
  error: ApiError | null;
}

const login = async ({ email, password }: Props) => {
  const { user, error }: Api = await supabase.auth.signIn({
    email,
    password,
  });

  if (error) {
    return Promise.reject('Email atau password salah');
  }

  return user;
};

export default function useLogin() {
  return useMutation(['login'], login);
}
