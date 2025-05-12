
import React from 'react';
import BlogManager from '@/components/blog/BlogManager';
import PageTitle from '@/components/ui/PageTitle';

const BlogPage = () => {
  return (
    <div className="cms-content">
      <PageTitle title="Blog Posts" />
      <BlogManager />
    </div>
  );
};

export default BlogPage;
