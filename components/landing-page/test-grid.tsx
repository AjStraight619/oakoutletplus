'use client';
import { cn } from '@/lib/utils';
import React from 'react';
import { BentoGrid, BentoGridItem } from '../ui/bento-grid';
import { IconBoxAlignRightFilled } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { BrushIcon, GiftIcon, HammerIcon, StarIcon } from 'lucide-react';
import { reviews } from '@/lib/test-data';
import { FB_REVIEW_PAGE } from '@/lib/constants';
import { ProjectImage } from '@prisma/client';
import SlickCarousel from './slick-carousel';
import SectionHeading from '../ui/section-heading';

type BentoGridThirdDemoProps = {
  refinishImages: ProjectImage[];
  remodelImages: ProjectImage[];
};

export function BentoGridThirdDemo({
  refinishImages,
  remodelImages,
}: BentoGridThirdDemoProps) {
  const items = [
    {
      title: 'Refinishes',
      description: (
        <span className="text-sm">
          Restore the beauty of your kitchen cabinets and surfaces with our
          expert refinishing services.
        </span>
      ),
      header: <Refinishes refinishImages={refinishImages} />,
      className: 'md:col-span-1',
      icon: <BrushIcon className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: 'Remodels',
      description: (
        <span className="text-sm">
          Transform your kitchen with our comprehensive remodeling services,
          tailored to your vision.
        </span>
      ),
      header: <Remodels remodelImages={remodelImages} />,
      className: 'md:col-span-1',
      icon: <HammerIcon className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: 'Personalized Items',
      description: (
        <span className="text-sm">
          Add a unique touch to your kitchen with custom-designed items that
          reflect your style.
        </span>
      ),
      header: <SkeletonThree />,
      className: 'md:col-span-1',
      icon: <GiftIcon className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: 'Customer Reviews',
      description: (
        <span className="text-sm">
          See what our customers are saying about us.
        </span>
      ),
      header: <Reviews />,
      className: 'md:col-span-2',
      icon: <StarIcon className="h-4 w-4 text-neutral-500" />,
    },

    // {
    //   title: 'Text Summarization',
    //   description: (
    //     <span className="text-sm">
    //       Summarize your lengthy documents with AI technology.
    //     </span>
    //   ),
    //   header: <SkeletonFive />,
    //   className: 'md:col-span-1',
    //   icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    // },
  ];

  return (
    <section className="mb-16">
      <SectionHeading>
        Explore Our Expertise & Customer Satisfaction
      </SectionHeading>
      <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem] py-10 md:py-16">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={cn('[&>p:text-lg]', item.className)}
            icon={item.icon}
          />
        ))}
      </BentoGrid>
    </section>
  );
}

const Refinishes = ({ refinishImages }: { refinishImages: ProjectImage[] }) => {
  const refinishImageUrls = refinishImages.map(refinish => refinish.imageUrl);

  console.log('Refinish images: ', refinishImageUrls);
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[9rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <SlickCarousel imageUrls={refinishImageUrls} />
    </motion.div>
  );
};
const Remodels = ({ remodelImages }: { remodelImages: ProjectImage[] }) => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: '100%',
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      width: ['0%', '100%'],
      transition: {
        duration: 2,
      },
    },
  };
  const remodelImageUrls = remodelImages.map(refinish => refinish.imageUrl);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[9rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <SlickCarousel imageUrls={remodelImageUrls} />
    </motion.div>
  );
};
const SkeletonThree = () => {
  const variants = {
    initial: {
      backgroundPosition: '0 50%',
    },
    animate: {
      backgroundPosition: ['0, 50%', '100% 50%', '0 50%'],
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: 'reverse',
      }}
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2"
      style={{
        background:
          'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
        backgroundSize: '400% 400%',
      }}
    >
      <motion.div className="h-full w-full rounded-lg"></motion.div>
    </motion.div>
  );
};

const Reviews = () => {
  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };

  const isMobile = () => {
    if (typeof window === 'undefined') return;
    return window.innerWidth < 768;
  };

  return (
    <motion.div
      // initial="initial"
      // animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2"
    >
      {reviews.map((review, idx) => (
        <motion.a
          key={idx}
          href={FB_REVIEW_PAGE}
          target="_blank"
          rel="noopener noreferrer"
          variants={
            isMobile() ? {} : idx === 0 ? first : idx === 2 ? second : {}
          }
          className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
        >
          <div className="flex sm:flex-row flex-col justify-center items-center sm:space-x-4">
            <Image
              src={review.imageUrl}
              alt="avatar"
              height="40"
              width="40"
              className="rounded-full"
            />
            <h5 className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
              {review.name}
            </h5>
          </div>
          <div className="flex-grow flex items-center justify-center mt-4">
            <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 line-clamp-3">
              {review.review}
            </p>
          </div>
        </motion.a>
      ))}
    </motion.div>
  );
};
const SkeletonFive = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2  items-start space-x-2 bg-white dark:bg-black"
      >
        <Image
          src="https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg"
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10"
        />
        <p className="text-xs text-neutral-500">
          There are a lot of cool framerworks out there like React, Angular,
          Vue, Svelte that can make your life ....
        </p>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
      >
        <p className="text-xs text-neutral-500">Use PHP.</p>
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
      </motion.div>
    </motion.div>
  );
};
