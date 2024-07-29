'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePositionReorder } from '@/hooks/usePositionReorder';
import { useMeasurePosition } from '@/hooks/useMeasurePosition';

interface ItemProps {
  i: number;
  updatePosition: (i: number, offset: { top: number; left: number }) => void;
  updateOrder: (i: number, dragXOffset: number, dragYOffset: number) => void;
  item: { id: number; height: number; width: number };
}

const items = [
  { height: 100, width: 100, id: 1 },
  { height: 100, width: 100, id: 2 },
  { height: 100, width: 100, id: 3 },
  { height: 100, width: 100, id: 4 },
  { height: 100, width: 100, id: 5 },
  { height: 100, width: 100, id: 6 },
  { height: 100, width: 100, id: 7 },
  { height: 100, width: 100, id: 8 },
  { height: 100, width: 100, id: 9 },
  { height: 100, width: 100, id: 10 },
];

export default function OldOrder() {
  const [order, updatePosition, updateOrder] = usePositionReorder(items);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: '10px',
        padding: '10px',
        width: '100%',
        maxWidth: '700px',
        margin: '0 auto',
      }}
    >
      {order.map((item, i) => (
        <Item
          key={item.id}
          i={i}
          updatePosition={updatePosition}
          updateOrder={updateOrder}
          item={item}
        />
      ))}
    </div>
  );
}

function Item({ i, updatePosition, updateOrder, item }: ItemProps) {
  const [isDragging, setDragging] = useState(false);

  const ref = useMeasurePosition(pos => updatePosition(i, pos));

  return (
    <motion.div
      className=""
      ref={ref}
      layout
      initial={false}
      style={{
        background: 'white',
        width: '100%',
        borderRadius: 5,
        zIndex: isDragging ? 3 : 1,
        height: item.height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 24,
        boxShadow: isDragging
          ? '0px 5px 5px rgba(0,0,0,0.1)'
          : '0px 3px 3px rgba(0,0,0,0.15)',
        transform: isDragging ? 'scale(1.12)' : 'scale(1.03)',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      whileHover={{
        scale: 1.03,
        boxShadow: '0px 3px 3px rgba(0,0,0,0.15)',
      }}
      whileTap={{
        scale: 1.12,
        boxShadow: '0px 5px 5px rgba(0,0,0,0.1)',
      }}
      drag
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      onUpdate={latest => {
        if (isDragging) {
          const deltaX = (latest.x as number) - item.width / 2;
          const deltaY = (latest.y as number) - item.height / 2;
          updateOrder(i, deltaX, deltaY);
        }
      }}
    >
      {item.id}
    </motion.div>
  );
}
