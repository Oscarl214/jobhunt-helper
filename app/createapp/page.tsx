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
import { stat } from 'fs';
const CreateApp = () => {
  const [jobtitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');
  const [dateapplied, setDateApplied] = useState('');
  const [status, setStatus] = useState('');
  //look into cloudinary file componenets

  const submitApp = async () => {
    try {
      let response = await fetch('/api/addApplication', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          jobtitle,
          company,
          notes,
          dateapplied,
          status,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Sucessfully created an Appliication', result);
        setJobTitle('');
        setCompany('');
        setNotes('');
        setDateApplied('');
        setStatus('');
      } else {
        console.error('Failed to add application');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  return (
    <div className="p-24 h-screen">
      <Table className="bg-white rounded-md">
        <TableCaption>Create and Application</TableCaption>
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
      <button className="btn btn-primary" onClick={submitApp}>
        Submit Application
      </button>
    </div>
  );
};

export default CreateApp;
