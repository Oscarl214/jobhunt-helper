import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>
        <JobPostingCard />
      </h1>
    </main>
  );
}
