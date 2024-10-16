'use server';

import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const fetchApplications = async () => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) {
    throw new Error('Email not found in session');
  }

  try {
    const usersApps = await prisma.user.findUnique({
      where: { email },
      select: {
        applications: {
          orderBy: {
            dateapplied: 'desc',
          },
        },
      },
    });
    return usersApps?.applications || [];
  } catch (error) {
    console.error('Error fetching users applications:', error);
    throw new Error('Error fetching job details');
  }
};
