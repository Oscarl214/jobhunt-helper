'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchApplication } from '@/app/lib/functions';
import dayjs from 'dayjs';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import ServerApps from '@/app/applications/serverApp';
const UpdateApp = () => {
  const [jobtitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');
  const [dateapplied, setDateApplied] = useState('');
  const [status, setStatus] = useState('');
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
      <div className="p-24 h-screen">
        <h2 className=" mb-4 text-black font-bold text-lg lg:text-5xl text-center">
          Update Application
        </h2>

        <Table className="bg-white rounded-md">
          <TableCaption>Create an Application</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[10%]">
                JobTitle: {application.jobtitle}
              </TableHead>
              <TableHead className="w-[10%]">
                Company: {application.company}
              </TableHead>
              <TableHead className="w-[10%]">Resume</TableHead>
              <TableHead className="w-[10%]">CoverLetter</TableHead>
              <TableHead className="w-[10%]">Notes</TableHead>
              <TableHead className="w-[10%]">
                DateApplied:{' '}
                {dayjs(application.dateapplied).format('MMMM D, YYYY')}
              </TableHead>
              <TableHead className="w-[10%]">
                Status: {application.status}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="text-black">
              <TableCell>
                <Input
                  type="text"
                  placeholder={`${application.jobtitle}`}
                  value={jobtitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </TableCell>
              <TableCell className="font-medium">
                {' '}
                <Input
                  type="text"
                  placeholder="Meta"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </TableCell>

              <TableCell>
                <Input type="text" placeholder="Resume" />
              </TableCell>
              <TableCell>
                {' '}
                <Input type="text" placeholder="CoverLetter" />
              </TableCell>
              <TableCell>
                {' '}
                <Input
                  type="text"
                  placeholder="Recruiter is.."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </TableCell>
              <TableCell>
                {' '}
                <Input
                  type="text"
                  placeholder="Jan, 20, 2025"
                  value={dateapplied}
                  onChange={(e) => setDateApplied(e.target.value)}
                />
              </TableCell>
              <TableCell>
                {' '}
                <Input
                  type="text"
                  placeholder="applied"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <button className="btn btn-primary">Update Application</button>

        <div className="mt-10">{/* <ServerApps /> */}</div>
      </div>
    </div>
  );
};

export default UpdateApp;
