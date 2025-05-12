
import React from 'react';
import PageManager from '@/components/pages/PageManager';
import PageTitle from '@/components/ui/PageTitle';

const PagesPage = () => {
  return (
    <div className="cms-content">
      <PageTitle title="Pages" />
      <PageManager />
    </div>
  );
};

export default PagesPage;
