import { useLayoutEffect, useState } from 'react';

export const useScreenSize = () => {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(false);

  useLayoutEffect(() => {
    const handleResize = () => {
      const isMobileSize = window.matchMedia('(max-width: 768px)').matches;
      setIsMobile(isMobileSize ? true : false);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile };
};
