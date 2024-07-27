'use client';
import Image from 'next/image';
import React from 'react';
import { Carousel, Card } from '@/components/ui/apple-cards-carousel';

export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-4xl font-bold text-black   font-sans">
        Some of our finished projects.
      </h2>
      <h3 className="max-w-7xl pl-6 mx-auto text-sm md:text-2xl tracking-wide font-semibold text-black-200">
        Click on an image to view the before and after.
      </h3>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={'dummy-content' + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{' '}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <Image
              src="/after-test.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: 'Artificial Intelligence',
    title: 'You can do more with AI.',
    src: '/after-test.png',
    content: <DummyContent />,
  },
  {
    category: 'Productivity',
    title: 'Enhance your productivity.',
    src: '/after-test.png',
    content: <DummyContent />,
  },
  {
    category: 'Product',
    title: 'Launching the new Apple Vision Pro.',
    src: '/after-test.png',
    content: <DummyContent />,
  },

  {
    category: 'Product',
    title: 'Maps for your iPhone 15 Pro Max.',
    src: '/after-test.png',
    content: <DummyContent />,
  },
  {
    category: 'iOS',
    title: 'Photography just got better.',
    src: '/after-test.png',
    content: <DummyContent />,
  },
  {
    category: 'Hiring',
    title: 'Hiring for a Staff Software Engineer',
    src: '/after-test.png',
    content: <DummyContent />,
  },
];
