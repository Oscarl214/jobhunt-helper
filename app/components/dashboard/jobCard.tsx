'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import CatJob from '@/public/CatJob.webp';

const JobPostingCard = () => {
  const [jobs, setJobs] = useState<[]>([]);
  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await fetch('/api/AI', {
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jobData = await response.json();
        const jobs = jobData().setJobs(jobData);
        console.log('These are the jobs at fetch', jobData);
      } catch (error) {
        console.error('Error fetching jobs', error);
      }
    };

    fetchJobData();
  }, []);

  return (
    <div>
      <div className="card border-3  bg-white-400 w-96 shadow-xl text-black">
        <figure className="hover:border-[#7480ff] cursor-pointer">
          <Image
            src={CatJob}
            alt="Shoes"
            width={400}
            height={400}
            className=""
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>
          <ul></ul>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Apply Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostingCard;
