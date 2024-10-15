import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from './navbar';
import AuthProvider from './auth/Provider';
import SideBar from './sidebar';
import { Toaster } from 'react-hot-toast';
import { getServerSession } from 'next-auth';
import { authOptions } from '../app/api/auth/[...nextauth]/route';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Job Hunt AI',
  description: 'A full stack app that helps get jobs',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <AuthProvider session={session}>
        <body className={inter.className}>
          <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
          <SideBar />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
