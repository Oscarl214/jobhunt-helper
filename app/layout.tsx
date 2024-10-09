import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from './navbar';
import AuthProvider from './auth/Provider';
import SideBar from './sidebar';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Job Hunt AI',
  description: 'A full stack app that helps get jobs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <NavBar />
        <SideBar />
        <body className={inter.className}>{children}</body>
      </AuthProvider>
    </html>
  );
}
