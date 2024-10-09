'use client';
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Application {
  id: string;
  jobtitle: string;
  company: string;
  status: string;
  resume: string;
  dateapplied: string;
  coverletter: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

const AppTable = () => {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchApps = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await fetch('/api/getApplications', {
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-cache',
        });

        if (!response) {
          return new Error(`HTTP error! status: ${response.status}`);
        }

        const jobData = await response.json();

        console.log('These are the applications', jobData);
        setApps(jobData.applications);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, []);
  return (
    <div>
      <Table className="bg-white rounded-md">
        <TableCaption>A list of your recent Applications.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">JobTitle</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>JobTitle</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>CoverLetter</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>CoverLetter</TableHead>
            <TableHead>DateApplied</TableHead>
            <TableHead>updatedAt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apps.map((app) => (
            <TableRow key={app.id}>
              <TableCell className="font-medium">{app.company}</TableCell>
              <TableCell>{app.jobtitle}</TableCell>
              <TableCell>{app.resume}</TableCell>
              <TableCell>{app.coverletter}</TableCell>
              <TableCell>{app.notes}</TableCell>
              <TableCell>{app.status}</TableCell>
              <TableCell>{app.dateapplied}</TableCell>
              <TableCell>{app.updatedAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppTable;
