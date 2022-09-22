import { supabase } from 'lib/supabaseClient';
import { useEffect, useState } from 'react';

export default function useImage(img: string) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const getImage = async () => {
      const { data } = await supabase.storage
        .from('public/motor')
        .download(img);
      const url = URL.createObjectURL(data as Blob);
      setUrl(url);
    };
    getImage();
  }, [img]);
  return url;
}
