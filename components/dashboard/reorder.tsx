'use client';

import React, { useRef, useState } from 'react';
import { Reorder } from 'framer-motion';
import Image from 'next/image';
import { ProjectImage } from '@prisma/client';

interface Item {
  id: number;
  type: 'before' | 'after' | 'standalone';
  src: string;
  content: string;
}

type ReorderImagesProps = {
  projectImages: ProjectImage[];
};

const ReorderImages = () => {
  const [beforeItems, setBeforeItems] = useState<Item[]>([
    { id: 1, type: 'before', src: '/before-test.png', content: 'Before 1' },
    { id: 2, type: 'before', src: '/before-test.png', content: 'Before 2' },
  ]);

  const [afterItems, setAfterItems] = useState<Item[]>([
    { id: 3, type: 'after', src: '/after-test.png', content: 'After 1' },
    { id: 4, type: 'after', src: '/after-test.png', content: 'After 2' },
  ]);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleReorderBefore = (newOrder: Item[]) => {
    setBeforeItems(newOrder);
  };

  const handleReorderAfter = (newOrder: Item[]) => {
    setAfterItems(newOrder);
  };

  return (
    <div className="p-4">
      <div className="container mx-auto flex space-x-4">
        <div
          ref={containerRef}
          className="w-1/2 rounded-md border border-black p-4"
        >
          <h2 className="text-center mb-4">Before</h2>
          <Reorder.Group
            className="space-y-2"
            values={beforeItems}
            onReorder={handleReorderBefore}
            axis="y"
          >
            {beforeItems.map(item => (
              <Reorder.Item
                key={item.id}
                value={item}
                className="bg-white border border-gray-300 rounded-lg p-4 text-center shadow-sm"
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0px 3px 3px rgba(0,0,0,0.15)',
                }}
                whileTap={{
                  scale: 1.12,
                  boxShadow: '0px 5px 5px rgba(0,0,0,0.1)',
                }}
                dragConstraints={containerRef}
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={item.src}
                    alt={item.content}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <div className="mt-2">{item.content}</div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
        <div
          ref={containerRef}
          className="w-1/2 rounded-md border border-black p-4"
        >
          <h2 className="text-center mb-4">After</h2>
          <Reorder.Group
            className="space-y-2"
            values={afterItems}
            onReorder={handleReorderAfter}
            axis="y"
          >
            {afterItems.map(item => (
              <Reorder.Item
                key={item.id}
                value={item}
                className="bg-white border border-gray-300 rounded-lg p-4 text-center shadow-sm"
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0px 3px 3px rgba(0,0,0,0.15)',
                }}
                whileTap={{
                  scale: 1.12,
                  boxShadow: '0px 5px 5px rgba(0,0,0,0.1)',
                }}
                dragConstraints={containerRef}
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={item.src}
                    alt={item.content}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <div className="mt-2">{item.content}</div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      </div>
    </div>
  );
};

export default ReorderImages;
