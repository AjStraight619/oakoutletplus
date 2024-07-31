'use client';

import Image from 'next/image';
import React, { useEffect } from 'react';
import {
  AnimatePresence,
  motion,
  animate,
  useMotionValue,
} from 'framer-motion';
import useMeasure from 'react-use-measure';

const SlickCarousel = () => {
  const items = ['/before-test.png', '/after-test.png'];
  let [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);
  useEffect(() => {
    let controls;
    let finalPosition = -width / 2 - 8;

    controls = animate(xTranslation, [0, finalPosition], {
      ease: 'linear',
      duration: 25,
      repeat: Infinity,
      repeatType: 'loop',
      repeatDelay: 0,
    });

    return () => {
      controls.stop();
    };
  }, [xTranslation, width]);

  return (
    <div className="">
      <motion.div
        ref={ref}
        className="absolute left-0 flex gap-4"
        style={{
          x: xTranslation,
        }}
      >
        {[...items, ...items, ...items, ...items, ...items, ...items].map(
          (item, idx) => (
            <Card key={idx} imageUrl={item} />
          ),
        )}
      </motion.div>
    </div>
  );
};

export default SlickCarousel;

function Card({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="relative overflow-hidden h-[200px] min-w-[200px] rounded-md">
      <Image src={imageUrl} alt=".." fill style={{ objectFit: 'cover' }} />
    </div>
  );
}
