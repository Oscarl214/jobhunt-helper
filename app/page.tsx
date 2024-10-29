import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/authoptions';
import Link from 'next/link';
import SignInButton from './login/SignInButton';

import AppTable from './applications/AppTable';
import ServerApps from './applications/serverApp';
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
    <div className="flex h-screen flex-col gap-4 justify-center p-24">
      <h2 className=" m-4 text-black font-bold text-lg lg:text-5xl text-center">
        Job Applications
      </h2>
      <ServerApps />
      <Link className="btn btn-primary" href={'/createapp'}>
        Log an Application
      </Link>
    </div>
  );
}
