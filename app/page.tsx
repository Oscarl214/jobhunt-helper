import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

import SignInButton from './login/SignInButton';

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
    <main className="flex min-h-screen  flex-row items-start justify-around p-24 flex-wrap ">
      <div className="flex flex-col gap-4 justify-center">
        <h2 className=" m-2 text-black font-bold text-lg lg:text-5xl text-center">
          Job Applications
        </h2>
        <AppTable />
        <button className="btn btn-primary">Submit an Application</button>
      </div>
    </main>
  );
}
