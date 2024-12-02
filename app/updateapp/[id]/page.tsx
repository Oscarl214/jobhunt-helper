'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import UploadWidget from '@/app/components/uploadwidget';
import UploadCLWidget from '@/app/components/uploadCLwidget';
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
  const [status, setStatus] = useState('');
  const [resume, setResume] = useState('');
  const [link, setLink] = useState('');
  const [cover, setCover] = useState('');
  const [iswidgetVisible, setWidgetVisible] = useState(true);
  const [isclwidgetVisible, setCLWidgetVisible] = useState(true);
  const [isOptionsVisible, setOptionsVisible] = useState(true);
  const toggleWidget = () => {
    setWidgetVisible((prevState) => !prevState);
  };

  const toggleCLWidget = () => {
    setCLWidgetVisible((prevState) => !prevState);
  };

  const toggleOptions = () => {
    setOptionsVisible((prevState) => !prevState);
  };

  const { id } = useParams();
  const appID = Array.isArray(id) ? id[0] : id;

  const queryClient = useQueryClient();

  const router = useRouter();
  //Fix the UI Front End for this project
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
    <div className="flex min-h-screen  flex-row items-start justify-around p-15 flex-wrap">
      <div className="p-24 h-screen">
        <h2 className=" mb-4 text-black font-bold text-lg lg:text-5xl text-center">
          Update Application
        </h2>

        <Table className=" text-black rounded-md">
          <TableCaption>
            Last Updated on:{' '}
            <span className="text-primary font-bold">
              {dayjs(application.updatedAt).format('MMMM D, YYYY')}
            </span>
          </TableCaption>
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
              <TableHead className="w-[10%]">
                Application Link:{' '}
                <span className="font-bold text-black">{application.link}</span>
              </TableHead>
              <TableHead className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                Resume:{' '}
                <a
                  href={application.resume || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Resume"
                >
                  {application.resume
                    ? application.resume
                    : 'No resume available'}
                </a>
              </TableHead>
              <TableHead className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                CoverLetter:{' '}
                <a
                  href={application.coverletter || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Cover Letter"
                  className="font-bold text-black"
                >
                  {application.coverletter
                    ? application.coverletter
                    : 'No Cover Letter available'}
                </a>
              </TableHead>
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
          <TableBody className="hover:bg-primary">
            <TableRow className="text-black ">
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
                {' '}
                <Input
                  type="text"
                  placeholder="www.amazon.com/careers"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </TableCell>
              <TableCell>
                {!iswidgetVisible ? (
                  <Input
                    type="text"
                    placeholder="Resume"
                    value={resume}
                    onClick={toggleWidget}
                  />
                ) : (
                  <UploadWidget
                    setResume={setResume}
                    setWidgetVisible={setWidgetVisible}
                  />
                )}
              </TableCell>
              <TableCell>
                {' '}
                {!isclwidgetVisible ? (
                  <Input
                    type="text"
                    placeholder="CoverLetter"
                    value={cover}
                    onClick={toggleCLWidget}
                  />
                ) : (
                  <UploadCLWidget
                    setCover={setCover}
                    setCLWidgetVisible={setCLWidgetVisible}
                  />
                )}
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
                {dayjs(application.dateapplied).format('MMMM D, YYYY')}
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
              await newApplication({
                jobtitle: jobtitle || application.jobtitle || '',
                status,
                resume: resume || application.resume || '',
                coverletter: cover || application.coverletter || '', // Use existing cover letter if no new one is uploaded
                company: company || application.company || '',
                link,
                notes,
                // dateapplied,
                appID,
              });
              setCompany('');
              // setDateApplied('');
              setNotes('');
              setStatus('');
              setCompany('');
              setCover('');
              setResume('');
              setWidgetVisible(true);
              setCLWidgetVisible(true);
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
