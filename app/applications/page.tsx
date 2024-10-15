import React from 'react';
import { Button } from '@/components/ui/button';
import AppTable from './AppTable';
import ServerApps from './serverApp';
const ApplicationsPage = () => {
  return (
    <div className="h-screen p-10">
      {/* <AppTable /> */}
      <ServerApps />
    </div>
  );
};

export default ApplicationsPage;
