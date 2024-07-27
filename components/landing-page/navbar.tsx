'use client';

import { MenuIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import Logo from './logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navLinks = [
  {
    label: 'Home',
    link: '/',
  },
  {
    label: 'About',
    link: '/about',
  },
  {
    label: 'Services',
    link: '/services',
  },
  {
    label: 'Contact',
    link: '/contact',
  },
];

export default function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="h-16 border-b border-muted-foreground fixed top-0 left-0 right-0 w-full z-50  backdrop-blur-sm">
      <div className="flex flex-row items-center justify-between h-full gap-x-2 container relative">
        <div className="hidden sm:flex items-center gap-x-4 h-full">
          {/* <Logo /> */}
          <ul className="flex items-center gap-x-4  h-full">
            {navLinks.map((item, idx) => (
              <motion.li key={idx} layout>
                <Link
                  href={item.link}
                  className="flex flex-col items-center pb-2 relative h-full mt-8"
                >
                  {item.label}
                  {pathname === item.link && (
                    <motion.div
                      className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-primary"
                      layoutId="underline"
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                      }}
                    />
                  )}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="block sm:hidden">
          <Button size="icon" variant="ghost" onClick={() => setOpen(!isOpen)}>
            <MenuIcon />
          </Button>
        </div>
        {!pathname.includes('/admin') && (
          <Button asChild>
            <Link href="/admin/dashboard">Admin</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
