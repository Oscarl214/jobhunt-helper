import NextAuth, { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response('User is not logged in', { status: 401 });
  }
  const { email } = session.user;

  if (!email) {
    return new Response('Email not found in session', { status: 400 });
  }

  try {
    const usersApp = await prisma.user.findUnique({
      where: { email },
      select: {
        applications: true,
      },
    });

    if (!usersApp) {
      return new Response('User not found', { status: 404 });
    }

    const application = usersApp.applications.find(
      (app) => app.id === parseInt(params.id)
    );

    if (!application) {
      return new Response('Application not found', { status: 404 });
    }

    return new Response(JSON.stringify(application), { status: 200 });
  } catch (error) {
    console.error('Error retrieving application:', error);
    return new Response('Error retrieving application', { status: 500 });
  }
}
