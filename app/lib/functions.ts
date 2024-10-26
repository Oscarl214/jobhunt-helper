'use server';

import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { user } from '@nextui-org/react';

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

export const fetchApplication = async ({ appId }: { appId: number }) => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) {
    throw new Error('Email not found in session');
  }

  try {
    const singleApplication = prisma.application.findUnique({
      where: { id: appId },
      select: {
        notes: true,
        company: true,
        dateapplied: true,
        jobtitle: true,
        status: true,
      },
    });

    return singleApplication;
  } catch (error) {
    console.error('Error processing request:', error);
    return null;
  }
};
export const addApplication = async ({
  jobtitle,
  company,
  status,
  // resume,
  // coverletter,
  dateapplied,
  notes,
}: {
  jobtitle: string;
  company: string;
  status: string;
  // resume: string;
  // coverletter: string;
  dateapplied: string;
  notes: string;
}) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response('User is not logged in', { status: 401 });
  }

  const { email } = session.user;

  if (!email) {
    return new Response('Email not found in session', { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    const userId = user.id;

    const dateAppliedAsDate = new Date(dateapplied);

    const jobApplication = await prisma.application.create({
      data: {
        jobtitle,
        company,
        status,
        dateapplied: dateAppliedAsDate,
        // resume,
        // coverletter,
        notes,
        ownerId: userId,
      },
    });

    return jobApplication;
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response('Error processing request', { status: 500 });
  }
};

export const deleteApplication = async ({ appID }: { appID: string }) => {
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
        id: true,
      },
    });

    if (!usersApp) {
      return new Response('User not found', { status: 404 });
    }

    const application = usersApp.applications.find(
      (app) => app.id === parseInt(appID)
    );

    if (!application) {
      return new Response('Application not found', { status: 404 });
    }

    const deletedApplication = await prisma.application.delete({
      where: { id: application.id },
    });

    console.log('This app has been deleted', deleteApplication);
    return deletedApplication;
  } catch (error) {
    console.error('Error retrieving application:', error);
    return new Response('Error retrieving application', { status: 500 });
  }
};

// Need to Create a function that lets user update the application

export const updateApplication = async ({
  appID,
  jobtitle,
  company,
  status,
  // resume,
  // coverletter,
  dateapplied,
  notes,
}: {
  appID: string;
  jobtitle: string;
  company: string;
  status: string;
  // resume: string;
  // coverletter: string;
  dateapplied: string;
  notes: string;
}) => {
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
        id: true,
      },
    });

    if (!usersApp) {
      return new Response('User not found', { status: 404 });
    }

    const application = usersApp.applications.find(
      (app) => app.id === parseInt(appID)
    );

    if (!application) {
      return new Response('Application not found', { status: 404 });
    }
    const dateAppliedAsDate = new Date(dateapplied);

    const updatedApplication = await prisma.application.update({
      where: { id: application.id },
      data: {
        jobtitle,
        company,
        status,
        dateapplied: dateAppliedAsDate,
        notes,
      },
    });

    return updatedApplication;
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response('Error processing request', { status: 500 });
  }
};
