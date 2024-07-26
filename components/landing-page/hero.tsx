import React from 'react';
import { TextGenerateEffect } from '../ui/text-generate-effect';

const Hero = () => {
  return (
    <div className="pb-20 pt-20 sm:pt-36">
      <h1 className="heading self-center font-light dark:text-red-500 text-black">
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
