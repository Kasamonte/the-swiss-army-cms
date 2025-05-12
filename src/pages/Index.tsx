
import React from 'react';
import { Outlet } from 'react-router-dom';
import CMSSidebar from '@/components/CMSSidebar';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  return (
    <div className="cms-container">
      <CMSSidebar />
      <main className="cms-content">
        <Dashboard />
      </main>
    </div>
  );
};

export default Index;
