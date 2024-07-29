import { useEffect, useRef, MutableRefObject } from 'react';

interface Position {
  height: number;
  width: number;
  top: number;
  left: number;
}

type UpdateFunction = (pos: Position) => void;

export function useMeasurePosition(
  update: UpdateFunction,
): MutableRefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      console.log('ref.current.offsetTop', ref.current.offsetTop);

      update({
        height: ref.current.offsetHeight,
        width: ref.current.offsetWidth,
        top: ref.current.offsetTop,
        left: ref.current.offsetLeft,
      });
    }
  });

  return ref;
}
