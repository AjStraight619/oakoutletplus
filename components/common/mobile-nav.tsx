'use client';
import { navLinks } from '@/lib/constants';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const container = {
    hidden: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.3 },
    },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },

    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        when: 'afterChildren',
      },
    },
  };

  const listContainer = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        delayChildren: 0.2,
        staggerDirection: -1,
      },
    },
  };

  const listItem = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <Button
        className="sm:hidden block z-50"
        onClick={() => setIsOpen(prev => !prev)}
        size="icon"
        variant={null}
      >
        <MenuIcon />
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="show"
            exit="exit"
            variants={container}
            className="fixed inset-0 h-screen bg-white dark:bg-black z-40 overflow-hidden"
          >
            <motion.ul
              className="flex flex-col w-full items-center justify-evenly h-full"
              initial="hidden"
              animate="show"
              exit="exit"
              variants={listContainer}
            >
              {navLinks.map((item, idx) => (
                <motion.li variants={listItem} key={idx}>
                  <Link onClick={() => setIsOpen(false)} href={item.link}>
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;
