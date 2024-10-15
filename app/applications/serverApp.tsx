import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { headers } from 'next/headers';
import { getServerSession } from 'next-auth';
import dayjs from 'dayjs';
import { fetchApplications } from '../lib/functions';

import { authOptions } from '../../app/api/auth/[...nextauth]/route';
interface Application {
  id: string;
  jobtitle: string;
  company: string;
  status: string;
  resume: string | null;
  dateapplied: string;
  coverletter: string | null;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

const ServerApps = async () => {
  const session = await getServerSession(authOptions);

  console.log('Front end session', session);
  const data = await fetchApplications(session);

  const applications = data?.applications || [];
  return (
    <div>
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
          {applications.map((app: Application) => (
            <TableRow key={app.id} className="text-black">
              <TableCell>{app.jobtitle}</TableCell>
              <TableCell className="font-medium">{app.company}</TableCell>

              <TableCell>
                {app.resume ? app.resume : 'No resume available'}
              </TableCell>
              <TableCell>
                {app.coverletter
                  ? app.coverletter
                  : 'No Cover Letter available'}
              </TableCell>
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
    </div>
  );
};

export default ServerApps;
