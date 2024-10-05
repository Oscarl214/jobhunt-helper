'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import CatJob from '@/public/CatJob.webp';
import CatCoder from '@/public/CatCoder.png';
import CatDocter from '@/public/CatDoc.png';
const JobPostingCard = () => {
  const [jobListings, setJobListings] = useState<[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDeveloperJobData = async () => {
    setLoading(true);
    let developer = 'developer';
    try {
      const response = await fetch('/api/AIDeveloper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: developer,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jobData = await response.json();
      const content = jobData.choices[0]?.message?.content;

      if (content) {
        const jobs = content
          .split(/\d\.\s+/)
          .filter((job: string) => job.trim() !== '');
        setJobListings(jobs);
      }
    } catch (error) {
      console.error('Error fetching developer jobs', error);
    } finally {
      setLoading(false);
    }
  };
  const fetchHealthCareJobData = async () => {
    setLoading(true);
    let healthcare = 'healthcare';
    try {
      const response = await fetch('/api/AIHealthCare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: healthcare,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jobData = await response.json();
      const content = jobData.choices[0]?.message?.content;

      if (content) {
        const jobs = content
          .split(/\d\.\s+/)
          .filter((job: string) => job.trim() !== '');
        setJobListings(jobs);
      }
    } catch (error) {
      console.error('Error fetching healthcare jobs', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex justify-center flex-row gap-2 flex-wrap">
        <div className="flex flex-col gap-2">
          <Image src={CatCoder} alt="Cat Doc Avatar" height={200} width={200} />
          <button
            className="btn btn-primary  hover:bg-inherit"
            onClick={fetchDeveloperJobData}
          >
            DeveloperJobs
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <Image
            src={CatDocter}
            alt="Cat Doc Avatar"
            height={200}
            width={200}
          />
          <button
            className="btn btn-primary hover:bg-inherit"
            onClick={fetchHealthCareJobData}
          >
            Healthcare Jobs
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center mt-5  flex-wrap">
          <span className="loading loading-ring w-[200px] text-center text-primary">
            Loading...
          </span>
        </div>
      ) : jobListings.length > 1 ? (
        <div className="flex justify-center flex-col gap-2 mt-5">
          {jobListings.map((job, index) => (
            <div
              key={index}
              className="card border-3 bg-white-400 w-96 shadow-xl text-black"
            >
              <figure className="hover:border-[#7480ff] cursor-pointer">
                <Image src={CatJob} alt="Job Image" width={400} height={400} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Job Listing {index + 1}</h2>
                <p>{job}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Apply Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center m-2">
          <p>Click a button to prefer choice of listings</p>
        </div>
      )}
    </div>
  );
};

export default JobPostingCard;
