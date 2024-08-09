import React, { ReactNode } from 'react';

const SectionSubHeading = ({ children }: { children: ReactNode }) => {
  return <h3 className="h3 text-center text-muted-foreground">{children}</h3>;
};

export default SectionSubHeading;
