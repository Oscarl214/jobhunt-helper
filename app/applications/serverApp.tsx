'use client';
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
import toast, { Toast } from 'react-hot-toast';
import { FaRegTrashCan } from 'react-icons/fa6';
import dayjs from 'dayjs';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { fetchApplications, deleteApplication } from '../lib/functions';
import { useQuery } from '@tanstack/react-query';
interface Application {
  id: number;
  jobtitle: string;
  company: string;
  status: string;
  resume: string | null;
  dateapplied: Date;
  coverletter: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const ServerApps = () => {
  const queryClient = useQueryClient();

  const {
    data: applications,
    isPending,
    error,
  } = useQuery({
    queryKey: ['appsData'],
    queryFn: () => fetchApplications(),
  });

  const { mutateAsync: deleteApplicationMutation } = useMutation({
    mutationFn: deleteApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appsData'] });
      toast.success('Successfully Deleted Application');
    },
  });

  if (isPending) {
    return 'Applications are Loading';
  }

  if (error) {
    return 'Failed to fetch applications';
  }

  return (
    <div className="">
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
          {applications?.map((app: Application) => (
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
              <TableCell>
                <FaRegTrashCan
                  className="hover:text-red-500"
                  onClick={async () => {
                    try {
                      await deleteApplicationMutation({
                        appID: app.id.toString(),
                      });
                    } catch (e) {
                      toast.error('Failed to delete the App');
                    }
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ServerApps;
