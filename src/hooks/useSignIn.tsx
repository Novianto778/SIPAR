import { ApiError } from '@supabase/supabase-js';
import { supabase } from 'lib/supabaseClient';
import { useState } from 'react';
import { useUserStore } from 'store/userStore';

const useSignIn = () => {
  const { user, setUser } = useUserStore((state) => state);
  const [error, setError] = useState<ApiError | null>(null);

  async function signIn(data: { email: string; password: string }) {
    const { user, error } = await supabase.auth.signIn(data);
    setUser(user);
    if (error?.status === 400) {
      setError({ ...error, message: 'Email atau password salah' });
    } else {
      setError(error);
    }
  }

  return { user, signIn, error };
};

export default useSignIn;
