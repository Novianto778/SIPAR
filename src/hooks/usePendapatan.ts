import { useQuery } from '@tanstack/react-query';
import { supabase } from 'lib/supabaseClient';

const getPendapatan = async (date: Date, endMonth: Date) => {
  const { data: pendapatan }: any = await supabase.rpc('total_pendapatan', {
    start_date: new Date(date),
    end_date: new Date(endMonth),
  });
  return pendapatan;
};

export default function usePendapatan(date: Date, endMonth: Date) {
  return useQuery(['pendapatan'], () => getPendapatan(date, endMonth));
}
