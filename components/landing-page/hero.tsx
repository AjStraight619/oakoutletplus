import React from 'react';
import { TextGenerateEffect } from '../ui/text-generate-effect';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="sm:pb-20 pb-8 sm:pt-8 pt-4">
      <h1 className="heading h1 self-center font-light text-black">
        Oak Outlet Plus
      </h1>
      <div className="flex flex-col items-center justify-center gap-y-3 mt-4">
        <TextGenerateEffect
          words="Over 30 years building unique and affordable custom kitchens. Give us a call for any project."
          className="text-center"
          textClassName="text-sm sm:text-lg"
        />
        <Button asChild>
          <Link href="#contact">
            Contact <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
