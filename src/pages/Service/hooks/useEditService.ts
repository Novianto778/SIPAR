import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTES } from 'constants/routes';
import { supabase } from 'lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Service } from 'types/service';

export const editService = async (service: Service) => {
  let { data } = await supabase
    .from('service')
    .update([service])
    .eq('id_service', service.id_service);

  return data;
};

export default function useEditService() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(editService, {
    onSuccess: async () => {
      return queryClient.invalidateQueries(['service']).then(() => {
        navigate(ROUTES.SERVICE);
      });
    },
  });
}
