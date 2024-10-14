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
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
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
      {loading ? (
        <div className="flex justify-center h-screen  items-center">
          <span className="loading loading-ring w-[200px] text-primary "></span>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Table className="bg-white rounded-md">
            <TableCaption>A list of your recent Applications.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">JobTitle</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Resume</TableHead>
                <TableHead>CoverLetter</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Status</TableHead>

                <TableHead>DateApplied</TableHead>
                <TableHead>updatedAt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apps.map((app) => (
                <TableRow key={app.id} className="text-black">
                  <TableCell>{app.jobtitle}</TableCell>
                  <TableCell className="font-medium">{app.company}</TableCell>

                  <TableCell>{app.resume}</TableCell>
                  <TableCell>{app.coverletter}</TableCell>
                  <TableCell>{app.notes}</TableCell>
                  <TableCell>{app.status}</TableCell>
                  <TableCell>
                    {dayjs(app.dateapplied).format('MMMM D, YYYY')}
                  </TableCell>
                  <TableCell>
                    {dayjs(app.updatedAt).format('MMMM D, YYYY')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      )}
    </div>
  );
};

export default AppTable;
