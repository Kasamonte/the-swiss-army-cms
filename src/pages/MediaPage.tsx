
import React from 'react';
import MediaLibrary from '@/components/media/MediaLibrary';
import PageTitle from '@/components/ui/PageTitle';

const MediaPage = () => {
  return (
    <div className="cms-content">
      <PageTitle title="Media Library" />
      <MediaLibrary />
    </div>
  );
};

export default MediaPage;
