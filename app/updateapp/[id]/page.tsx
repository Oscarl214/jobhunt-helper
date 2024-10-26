'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchApplication } from '@/app/lib/functions';
const UpdateApp = () => {
  const { id } = useParams();

  console.log('params', id);

  const {
    data: application,
    isPending,
    error,
  } = useQuery({
    queryKey: ['applicationData', id],
    queryFn: () => {
      const appId = Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id, 10);
      return fetchApplication({ appId });
    },
  });

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error loading application data</p>;

  if (!application) {
    return <p>No application data available</p>;
  }

  return (
    <div className="flex min-h-screen  flex-row items-start justify-around p-24 flex-wrap">
      <ul>{application.company}</ul>
    </div>
  );
};

export default UpdateApp;
