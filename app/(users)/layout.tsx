import React, { ReactNode } from 'react';

const UsersLayout = ({ children }: { children: ReactNode }) => {
  return <div className="sm:pt-20 pt-16 sm:px-16 px-12">{children}</div>;
};

export default UsersLayout;
