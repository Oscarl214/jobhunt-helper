import React from 'react';
import { Button } from '@/components/ui/button';
import AppTable from './AppTable';
import ServerApps from './serverApp';
const ApplicationsPage = () => {
  return (
    <div className="flex min-h-screen  flex-row items-start justify-around p-24 flex-wrap">
      <ServerApps />
    </div>
  );
};

export default ApplicationsPage;
