import NextAuth, { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response('User is not logged in', { status: 401 });
  }

  const { email } = session.user;

  if (!email) {
    return new Response('Email not found in session', { status: 400 });
  }

  try {
    const usersApps = await prisma.user.findUnique({
      where: { email },
      select: {
        applications: true,
      },
    });

    return new Response(JSON.stringify(usersApps), { status: 200 });
  } catch (error) {
    console.error('Error fetching users applications:', error);
    return new Response('Error fetching job details', { status: 500 });
  }
}
