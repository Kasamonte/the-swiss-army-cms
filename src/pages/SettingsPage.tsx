
import React from 'react';
import SettingsPanel from '@/components/settings/SettingsPanel';
import PageTitle from '@/components/ui/PageTitle';

const SettingsPage = () => {
  return (
    <div className="cms-content">
      <PageTitle title="Settings" />
      <SettingsPanel />
    </div>
  );
};

export default SettingsPage;
