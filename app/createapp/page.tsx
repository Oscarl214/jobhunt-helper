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
import UploadCLWidget from '../components/uploadCLwidget';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { addApplication, deleteApplication } from '../lib/functions';
import UploadWidget from '../components/uploadwidget';
import ServerApps from '../applications/serverApp';
const CreateApp = () => {
  const [jobtitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');
  const [dateapplied, setDateApplied] = useState('');
  const [status, setStatus] = useState('');
  const [link, setLink] = useState('');
  const [resume, setResume] = useState('');
  const [cover, setCover] = useState('');
  const [isOptionsVisible, setOptionsVisible] = useState(true);
  const [iswidgetVisible, setWidgetVisible] = useState(true);
  const [isclwidgetVisible, setCLWidgetVisible] = useState(true);

  const toggleOptions = () => {
    setOptionsVisible((prevState) => !prevState);
  };

  const toggleWidget = () => {
    setWidgetVisible((prevState) => !prevState);
  };

  const toggleCLWidget = () => {
    setCLWidgetVisible((prevState) => !prevState);
  };
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
            <TableHead className="w-[10%]">Application Link</TableHead>
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
            <TableCell className="font-medium">
              {' '}
              <Input
                type="text"
                placeholder="www.amazonCareers.com.."
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
        className="btn btn-primary"
        onClick={async () => {
          try {
            await addApplicationMutation({
              jobtitle,
              status,
              company,
              link,
              notes,
              coverletter: cover,
              resume,
              dateapplied,
            });
            setJobTitle('');
            setCompany('');
            setDateApplied('');
            setNotes('');
            setStatus('');
            setCompany('');
            setResume('');
            setLink('');
            setCover('');
            setWidgetVisible(true);
            setCLWidgetVisible(true);
          } catch (e) {
            toast.error('Failed to add Application');
          }
        }}
      >
        Submit Application
      </button>

      <div className="mt-10">
        <ServerApps />
      </div>
    </div>
  );
};

export default CreateApp;
