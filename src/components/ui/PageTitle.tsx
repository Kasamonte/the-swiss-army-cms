
import React from 'react';
import { Helmet } from 'react-helmet';

interface PageTitleProps {
  title: string;
  suffix?: string;
}

const PageTitle = ({ title, suffix = "Admin CMS" }: PageTitleProps) => {
  const fullTitle = suffix ? `${title} | ${suffix}` : title;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
    </Helmet>
  );
};

export default PageTitle;
