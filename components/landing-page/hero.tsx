import React from 'react';
import { TextGenerateEffect } from '../ui/text-generate-effect';

const Hero = () => {
  return (
    <div className="sm:pb-20 pb-8 sm:pt-8 pt-4">
      <h1 className="heading h1 self-center font-light text-black">
        Oak Outlet Plus
      </h1>
      <div className="flex justify-center">
        <TextGenerateEffect
          words="Over 30 years building unique and affordable custom kitchens. Give us a call for any project."
          className="text-center"
          textClassName="text-sm sm:text-lg"
        />
      </div>
    </div>
  );
};

export default Hero;
