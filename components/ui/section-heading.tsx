import React, { ReactNode } from 'react';

const SectionHeading = ({ children }: { children: ReactNode }) => {
  return <h2 className="h2 font-bold text-center">{children}</h2>;
};

export default SectionHeading;
