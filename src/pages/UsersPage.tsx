
import React from 'react';
import UserManager from '@/components/users/UserManager';
import PageTitle from '@/components/ui/PageTitle';

const UsersPage = () => {
  return (
    <div className="cms-content">
      <PageTitle title="Users" />
      <UserManager />
    </div>
  );
};

export default UsersPage;
