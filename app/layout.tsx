import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from './navbar';
import AuthProvider from './auth/Provider';
import SideBar from './sidebar';
import { Toaster } from 'react-hot-toast';
import { getServerSession } from 'next-auth';
import { authOptions } from './lib/authoptions';
import QueryProvider from './QueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Job Hunt AI',
  description: 'A full stack app that helps get jobs',
};
//attempt 3
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          <AuthProvider session={session}>
            <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
            <SideBar />
            <div className="pl-[20rem] overflow-x-hidden">{children}</div>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  ); //testing
}

//testing new url
