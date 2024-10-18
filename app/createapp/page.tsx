'use client';
import React, { useState } from 'react';
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
import Link from 'next/link';
import toast, { Toast } from 'react-hot-toast';
import dayjs, { Dayjs } from 'dayjs';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { addApplication } from '../lib/functions';

import ServerApps from '../applications/serverApp';
const CreateApp = () => {
  const [jobtitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');
  const [dateapplied, setDateApplied] = useState('');
  const [status, setStatus] = useState('');

  // const submitApp = async () => {
  //   if (!jobtitle) {
  //     toast.error('Please Provide a job title');
  //   }

  //   if (!company) {
  //     toast.error('Please Provide a job title');
  //   }
  //   if (!status) {
  //     toast.error('Please Provide the status of your application');
  //   }

  //   if (!dateapplied || !dayjs(dateapplied, 'MMM D, YYYY').isValid()) {
  //     return toast.error('Date is invalid or empty. Format: Jan, 20, 2025');
  //   }

  //   try {
  //     const formattedDate = dayjs(dateapplied, 'MMM D, YYYY').toISOString();

  //     let response = await fetch('/api/addApplication', {
  //       method: 'POST',
  //       headers: {
  //         'content-type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         jobtitle,
  //         company,
  //         notes,
  //         dateapplied: formattedDate,
  //         status,
  //       }),
  //     });

  //     if (response.ok) {
  //       const result = await response.json();
  //       console.log('Sucessfully created an Appliication', result);
  //       setJobTitle('');
  //       setCompany('');
  //       setNotes('');
  //       setDateApplied('');
  //       setStatus('');
  //     } else {
  //       console.error('Failed to add application');
  //     }
  //   } catch (error) {
  //     console.error('Error submitting application:', error);
  //   }
  // };

  const queryClient = useQueryClient();

  const { mutateAsync: addApplicationMutation } = useMutation({
    mutationFn: addApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appsData'] });
    },
  });

  return (
    <div className="p-24 h-screen">
      <h2 className=" mb-4 text-black font-bold text-lg lg:text-5xl text-center">
        Log your most recent Application
      </h2>

      <Table className="bg-white rounded-md">
        <TableCaption>Create an Application</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10%]">JobTitle</TableHead>
            <TableHead className="w-[10%]">Company</TableHead>
            <TableHead className="w-[10%]">Resume</TableHead>
            <TableHead className="w-[10%]">CoverLetter</TableHead>
            <TableHead className="w-[10%]">Notes</TableHead>
            <TableHead className="w-[10%]">DateApplied</TableHead>
            <TableHead className="w-[10%]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="text-black">
            <TableCell>
              <Input
                type="text"
                placeholder="Front End Dev.."
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
      <button
        className="btn btn-primary"
        onClick={async () => {
          try {
            await addApplicationMutation({
              jobtitle,
              status,
              company,
              notes,
              dateapplied,
            });
            setCompany('');
            setDateApplied('');
            setNotes('');
            setStatus('');
            setCompany('');
          } catch (e) {
            toast.error('Failed to add Application');
          }
        }}
      >
        Submit Application
      </button>

      <div>
        <ServerApps />
      </div>
    </div>
  );
};

export default CreateApp;
