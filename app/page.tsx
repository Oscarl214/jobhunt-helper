import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import JobBoardMotion from './components/dashboard/JobBoardMotion';
import SignInButton from './login/SignInButton';
import JobPostingCard from './components/dashboard/jobCard';
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24 flex-wrap ">
      <JobBoardMotion>
        <div className="flex justify-start items-start flex-col w-full m-2  rounded-md">
          <h2 className=" m-2 text-black font-bold text-lg lg:text-5xl text-center">
            Job Board
          </h2>

          <JobPostingCard />
        </div>
      </JobBoardMotion>
    </main>
  );
}
