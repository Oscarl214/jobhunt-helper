import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import JobBoardMotion from './components/dashboard/JobBoardMotion';
import SignInButton from './login/SignInButton';
import { FaCode } from 'react-icons/fa6';
import { FaUserDoctor } from 'react-icons/fa6';
import JobPostingCard from './components/dashboard/jobCard';
import AppTable from './applications/AppTable';
export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <SignInButton />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-row items-start justify-around p-24 flex-wrap ">
      <JobBoardMotion>
        <div className="flex justify-start items-start flex-col w-full m-2  rounded-md">
          <div className="flex flex-row gap-2 items-center justify-center">
            <FaCode className="text-3xl text-blue-500" />
            <h2 className=" m-2 text-black font-bold text-lg lg:text-5xl text-center">
              Job Boards
            </h2>
            <FaUserDoctor className="text-3xl text-green-500" />
          </div>
          <JobPostingCard />
        </div>
      </JobBoardMotion>
      <div className="flex flex-col gap-4 justify-center">
        <h2 className=" m-2 text-black font-bold text-lg lg:text-5xl text-center">
          Job Applications
        </h2>
        <AppTable />
      </div>
    </main>
  );
}
