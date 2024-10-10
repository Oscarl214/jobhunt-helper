'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import CatJob from '@/public/CatJob.webp';
import CatCoder from '@/public/CatCoder.png';
import CatDocter from '@/public/CatDoc.png';

const JobPostingCard = () => {
  const [jobListings, setJobListings] = useState<[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState<
    'developer' | 'healthcare' | null
  >(null);

  const fetchDeveloperJobData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/AIDeveloper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: 'developer' }),
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const jobData = await response.json();
      const jobs = jobData.choices[0]?.message?.content
        .split(/\d\.\s+/)
        .filter((job: string) => job.trim() !== '');
      setJobListings(jobs);
    } catch (error) {
      console.error('Error fetching developer jobs', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHealthCareJobData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/AIHealthCare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: 'healthcare' }),
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const jobData = await response.json();
      const jobs = jobData.choices[0]?.message?.content
        .split(/\d\.\s+/)
        .filter((job: string) => job.trim() !== '');
      setJobListings(jobs);
    } catch (error) {
      console.error('Error fetching healthcare jobs', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeveloperClick = () => {
    setActiveButton('developer');
    fetchDeveloperJobData();
  };

  const handleHealthcareClick = () => {
    setActiveButton('healthcare');
    fetchHealthCareJobData();
  };

  return (
    <div className="flex  justify-start items-start gap-10">
      <div className="flex flex-col items-start gap-5">
        <div className="flex flex-col items-start gap-2">
          <Image src={CatCoder} alt="Cat Coder" height={200} width={200} />
          <button
            className={`btn ${
              activeButton === 'developer' ? 'bg-blue-500' : 'bg-gray-400'
            } text-black`}
            onClick={handleDeveloperClick}
          >
            Developer Job Boards
          </button>
        </div>
        <div className="flex flex-col items-start gap-2">
          <Image src={CatDocter} alt="Cat Doctor" height={200} width={200} />
          <button
            className={`btn ${
              activeButton === 'healthcare' ? 'bg-green-500' : 'bg-gray-400'
            } text-black`}
            onClick={handleHealthcareClick}
          >
            Healthcare Job Boards
          </button>
        </div>
      </div>

      <div className="flex-1">
        {loading ? (
          <div className="flex flex-1 justify-center items-center h-screen w-screen">
            <span className="loading text-center loading-ring w-[200px] text-[#8860D0]">
              Loading...
            </span>
          </div>
        ) : jobListings.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5"
          >
            {jobListings.map((job, index) => (
              <div
                key={index}
                className="card border-2 bg-gray-300 w-full shadow-xl text-black"
              >
                <figure className="cursor-pointer">
                  <Image
                    src={CatJob}
                    alt="Job Image"
                    width={400}
                    height={400}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Job Board {index + 1}</h2>
                  <p>{job}</p>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <div className="flex justify-center m-2">
            <p>Click a button to view job listings</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobPostingCard;
