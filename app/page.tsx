import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

import SignInButton from './login/SignInButton';
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
        This Application will be dedicated to helping my partner with her job
        application process.
      </h1>
    </main>
  );
}
