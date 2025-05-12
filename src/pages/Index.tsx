
import React from 'react';
import Dashboard from '@/components/Dashboard';
import PageTitle from '@/components/ui/PageTitle';

const Index = () => {
  return (
    <div className="cms-content">
      <PageTitle title="Dashboard" />
      <Dashboard />
    </div>
  );
};

export default Index;
