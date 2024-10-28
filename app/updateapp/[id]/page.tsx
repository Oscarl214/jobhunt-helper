'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { fetchApplication, updateApplication } from '@/app/lib/functions';
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
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
const UpdateApp = () => {
  const [jobtitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');
  const [dateapplied, setDateApplied] = useState('');
  const [status, setStatus] = useState('');

  const [isOptionsVisible, setOptionsVisible] = useState(true);

  const toggleOptions = () => {
    setOptionsVisible((prevState) => !prevState);
  };

  const { id } = useParams();
  const appID = Array.isArray(id) ? id[0] : id;

  const queryClient = useQueryClient();

  const router = useRouter();

  const {
    data: application,
    isPending,
    error,
  } = useQuery({
    queryKey: ['applicationData', appID],
    queryFn: () => {
      const appId = Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id, 10);
      return fetchApplication({ appId });
    },
  });

  const { mutateAsync: newApplication } = useMutation({
    mutationFn: updateApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appsData'] });
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
          <TableCaption>Update an Application</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[10%]">
                JobTitle:{' '}
                <span className="font-bold text-black">
                  {application.jobtitle}
                </span>
              </TableHead>
              <TableHead className="w-[10%]">
                Company:{' '}
                <span className="font-bold text-black">
                  {application.company}
                </span>
              </TableHead>
              <TableHead className="w-[10%]">Resume</TableHead>
              <TableHead className="w-[10%]">CoverLetter</TableHead>
              <TableHead className="w-[10%]">
                Notes:{' '}
                <span className="font-bold text-black">
                  {application.notes}
                </span>{' '}
              </TableHead>
              <TableHead className="w-[10%]">
                DateApplied:{' '}
                <span className="font-bold text-black">
                  {dayjs(application.dateapplied).format('MMMM D, YYYY')}
                </span>
              </TableHead>
              <TableHead className="w-[10%]">
                Status:{' '}
                <span className="font-bold text-black">
                  {application.status}
                </span>
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
                <>
                  {!isOptionsVisible ? (
                    <Input
                      type="text"
                      placeholder="applied"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      onClick={toggleOptions}
                    />
                  ) : (
                    <select
                      className="select select-primary bg-white w-full max-w-xs"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option disabled value="">
                        Select application status
                      </option>
                      <option value="applied">Applied</option>
                      <option value="interview">Interview</option>
                      <option value="offered">Offered</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  )}
                </>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <button
          className="btn bg-green-400 text-black hover:bg-primary"
          onClick={async () => {
            try {
              await updateApplication({
                jobtitle,
                status,
                company,
                notes,
                dateapplied,
                appID,
              });
              setCompany('');
              setDateApplied('');
              setNotes('');
              setStatus('');
              setCompany('');
              toast.success('Successfully updated Application');
              router.push('/');
            } catch (e) {
              toast.error('Failed to update Application');
            }
          }}
        >
          Update Application
        </button>
        <button
          className="btn btn-primary ml-4"
          onClick={() => router.push('/')}
        >
          Back to Applications
        </button>
      </div>
    </div>
  );
};

export default UpdateApp;
