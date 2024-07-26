import { useState } from 'react';

export const useCharCount = (maxCharCount: number) => {
  const [charCount, setCharCount] = useState(maxCharCount);
  const handleCharCountChange = (input: string) => {
    setCharCount(maxCharCount - input.length);
  };
  return { charCount, handleCharCountChange };
};
