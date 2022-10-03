import { Session } from '@supabase/supabase-js';
import { supabase } from 'lib/supabaseClient';
import React from 'react';
import { useUserStore } from 'store/userStore';

const useAuthStateChange = () => {
  const { user, setUser } = useUserStore((state) => state);
  const [session, setSession] = React.useState<Session | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const currentUser = supabase.auth.user();
    setUser(currentUser);
    setLoading(false);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = await supabase.auth.user();
        setUser(currentUser);
        setSession(session);
        setLoading(false);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, [setUser, session]);

  return { user, session, loading };
};

export default useAuthStateChange;
