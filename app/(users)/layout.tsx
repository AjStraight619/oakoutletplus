import React, { ReactNode } from 'react';

const UsersLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex-grow flex flex-col items-center sm:pt-20 pt-12 sm:px-16 px-12">
      {children}
    </div>
  );
};

export default UsersLayout;
