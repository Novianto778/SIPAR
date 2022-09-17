import { supabase } from './supabaseClient';

interface Login {
  email: string;
  password: string;
}

export async function signInWithEmail(data: Login) {
  const { user, error } = await supabase.auth.signIn(data);
  console.log(user, error)
}
