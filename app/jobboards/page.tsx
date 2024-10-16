import React from 'react';
import { FaCode } from 'react-icons/fa6';
import { FaUserDoctor } from 'react-icons/fa6';
import JobBoardMotion from '../components/dashboard/JobBoardMotion';
import JobPostingCard from '../components/dashboard/jobCard';

const JobBoardPage = () => {
  return (
    <div>
      <div className="flex min-h-screen  flex-row items-start  ">
        <JobBoardMotion>
          <div className="flex justify-between items-start flex-col w-full m-2  rounded-md">
            <div className="flex flex-row gap-2 items-center justify-between">
              <FaCode className="text-3xl text-blue-500" />
              <h2 className=" m-2 text-black font-bold text-lg lg:text-5xl text-center">
                Job Boards
              </h2>
              <FaUserDoctor className="text-3xl text-green-500" />
            </div>
            <JobPostingCard />
          </div>
        </JobBoardMotion>
      </div>
    </div>
  );
};

export default JobBoardPage;
