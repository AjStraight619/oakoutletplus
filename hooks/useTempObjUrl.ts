import { useEffect, useState } from 'react';

export const useTempObjUrl = (file: File | undefined) => {
  const [tempUrl, setTempUrl] = useState<string>('');

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setTempUrl(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
  }, [file]);

  return { tempUrl };
};
