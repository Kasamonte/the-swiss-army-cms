
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  children?: React.ReactNode;
}

const PageHeader = ({ title, description, action, children }: PageHeaderProps) => {
  return (
    <div className="flex flex-col space-y-4 pb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-muted-foreground max-w-2xl mt-2">{description}</p>
          )}
        </div>
        {action && (
          <Button onClick={action.onClick}>{action.label}</Button>
        )}
      </div>
      {children}
      <Separator />
    </div>
  );
};

export default PageHeader;
