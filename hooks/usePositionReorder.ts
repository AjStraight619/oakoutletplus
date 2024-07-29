import { useState, useRef } from 'react';
import { clamp } from '@/lib/utils';
import { distance } from '@/lib/utils';
import { arrayMoveImmutable } from '@/lib/utils';
import { InitialState, Position } from '@/lib/types';

interface Offset {
  top: number;
  left: number;
}

export function usePositionReorder(initialState: InitialState) {
  const [order, setOrder] = useState(initialState);

  const positions = useRef<Position[]>([]).current;

  const updatePosition = (i: number, offset: Offset) => {
    const current = positions[i] || { width: 0, height: 0 };
    positions[i] = { ...current, ...offset };
  };

  const updateOrder = (i: number, dragXOffset: number, dragYOffset: number) => {
    const targetIndex = findIndex(i, dragXOffset, dragYOffset, positions);
    if (targetIndex !== i) setOrder(arrayMoveImmutable(order, i, targetIndex));
  };

  return [order, updatePosition, updateOrder] as const;
}

const buffer = 0;

export const findIndex = (
  i: number,
  xOffset: number,
  yOffset: number,
  positions: Position[],
): number => {
  let target = i;
  const { top, width, height, left } = positions[i];
  const bottom = top + height;
  const right = left + width;

  if (yOffset < 0 && Math.abs(yOffset) > Math.abs(xOffset)) {
    const prevItem = positions[i - 3];
    if (prevItem === undefined) return i;
    const prevBottom = prevItem.top + prevItem.height;
    const ySwapOffset =
      distance(top, prevBottom - prevItem.height / 2) + buffer;
    if (yOffset < -ySwapOffset) target = i - 3;
  } else if (yOffset > 0 && Math.abs(yOffset) > Math.abs(xOffset)) {
    const nextItem = positions[i + 3];
    if (nextItem === undefined) return i;
    const ySwapOffset =
      distance(bottom, nextItem.top + nextItem.height / 2) + buffer;
    if (yOffset > ySwapOffset) target = i + 3;
  } else if (xOffset < 0 && Math.abs(xOffset) > Math.abs(yOffset)) {
    const prevItem = positions[i - 1];
    if (prevItem === undefined) return i;
    const prevRight = prevItem.left + prevItem.width;
    const xSwapOffset = distance(left, prevRight - prevItem.width / 2) + buffer;
    if (xOffset < -xSwapOffset) target = i - 1;
  } else if (xOffset > 0 && Math.abs(xOffset) > Math.abs(yOffset)) {
    const nextItem = positions[i + 1];
    if (nextItem === undefined) return i;
    const xSwapOffset =
      distance(right, nextItem.left + nextItem.width / 2) + buffer;
    if (xOffset > xSwapOffset) target = i + 1;
  }

  return clamp(0, positions.length, target);
};
