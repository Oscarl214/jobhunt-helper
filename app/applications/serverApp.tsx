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
import toast, { Toast } from 'react-hot-toast';
import { FaRegTrashCan } from 'react-icons/fa6';
import dayjs from 'dayjs';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { fetchApplications, deleteApplication } from '../lib/functions';
import { useQuery } from '@tanstack/react-query';
import { FaRegEdit } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
interface Application {
  id: number;
  jobtitle: string;
  company: string;
  link: string | null;
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

  const router = useRouter();

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

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
            <TableHead>Application Link</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>CoverLetter</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Status</TableHead>

            <TableHead>DateApplied</TableHead>
            <TableHead>updatedAt</TableHead>
            <TableHead>Update App</TableHead>
            <TableHead>Delete App</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applications.length === 0 ? (
            <TableCaption className="flex justify-center items-center text-black font-bold">
              Please Log your first Application!
            </TableCaption>
          ) : (
            applications?.map((app: Application) => (
              <TableRow key={app.id} className="text-black hover:bg-purple-200">
                <TableCell>{app.jobtitle}</TableCell>
                <TableCell className="font-medium">{app.company}</TableCell>
                <TableCell className="font-medium cursor-pointer">
                  <a href={app.link || undefined} target="_blank">
                    {app.link ? app.link : 'Link not provided'}
                  </a>
                </TableCell>
                <TableCell className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                  <a
                    href={app.resume || undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Resume"
                  >
                    {app.resume ? app.resume : 'No resume available'}
                  </a>
                </TableCell>
                <TableCell className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                  <a
                    href={app.coverletter || undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Cover Letter"
                  >
                    {app.coverletter
                      ? app.coverletter
                      : 'No Cover Letter available'}
                  </a>
                </TableCell>
                <TableCell className="overflow-auto">{app.notes}</TableCell>
                <TableCell>{app.status}</TableCell>
                <TableCell>
                  {dayjs(app.dateapplied).format('MMMM D, YYYY')}
                </TableCell>
                <TableCell>
                  {dayjs(app.updatedAt).format('MMMM D, YYYY')}
                </TableCell>
                <TableCell>
                  <FaRegEdit
                    title="Update Application"
                    className="cursor-pointer hover:text-green-500"
                    onClick={() => router.push(`/updateapp/${app.id}`)}
                  />
                </TableCell>
                <TableCell className="text-cen">
                  <FaRegTrashCan
                    title="Delete Application"
                    className="hover:text-red-500 text-center"
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
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ServerApps;
