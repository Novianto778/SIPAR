import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTES } from 'constants/routes';
import { supabase } from 'lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Service } from 'types/service';

export const addService = async (dataService: Service) => {
  let { data } = await supabase.from('service').insert([dataService]);

  return { data };
};

export default function useAddService() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(['service'], addService, {
    onSuccess: async () => {
      return queryClient.invalidateQueries(['service']).then(() => {
        navigate(ROUTES.SERVICE);
      });
    },
  });
}
