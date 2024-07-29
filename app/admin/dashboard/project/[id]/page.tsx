type AdminProjectPageProps = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

import React from 'react';

const AdminProjectPage = ({ params, searchParams }: AdminProjectPageProps) => {
  const { id } = params;
  return <div>AdminProjectPage</div>;
};

export default AdminProjectPage;
