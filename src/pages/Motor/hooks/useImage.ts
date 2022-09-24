import { supabase } from 'lib/supabaseClient';
import { useEffect, useState } from 'react';

export default function useImage(img: string) {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  useEffect(() => {
    const getImage = async () => {
      const { data } = await supabase.storage.from('motor').download(img);
      const url = URL.createObjectURL(data as Blob);
      setImage(url);
    };
    if(img) getImage();
  }, [img]);
  return { image, setImage };
}
