// import NextAuth, { NextAuthOptions } from 'next-auth';
// import { getServerSession } from 'next-auth';
// import prisma from '@/lib/prisma';
// import { authOptions } from '../../auth/[...nextauth]/route';

// export async function GET(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const session = await getServerSession(authOptions);

//   if (!session || !session.user) {
//     return new Response('User is not logged in', { status: 401 });
//   }
//   const { email } = session.user;

//   if (!email) {
//     return new Response('Email not found in session', { status: 400 });
//   }

//   try {
//     const usersApp = await prisma.user.findUnique({
//       where: { email },
//       select: {
//         applications: true,
//       },
//     });

//     if (!usersApp) {
//       return new Response('User not found', { status: 404 });
//     }

//     const application = usersApp.applications.find(
//       (app) => app.id === parseInt(params.id)
//     );

//     if (!application) {
//       return new Response('Application not found', { status: 404 });
//     }

//     return new Response(JSON.stringify(application), { status: 200 });
//   } catch (error) {
//     console.error('Error retrieving application:', error);
//     return new Response('Error retrieving application', { status: 500 });
//   }
// }

// export async function PUT(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const session = await getServerSession(authOptions);

//   if (!session || !session.user) {
//     return new Response('User is not logged in', { status: 401 });
//   }
//   const { email } = session.user;

//   if (!email) {
//     return new Response('Email not found in session', { status: 400 });
//   }

//   try {
//     const updateData = await request.json();

//     const usersApp = await prisma.user.findUnique({
//       where: { email },
//       select: {
//         applications: true,
//       },
//     });

//     if (!usersApp) {
//       return new Response('User not found', { status: 404 });
//     }

//     const application = usersApp.applications.find(
//       (app) => app.id === parseInt(params.id)
//     );

//     if (!application) {
//       return new Response('Application not found', { status: 404 });
//     }

//     const updatedApplication = await prisma.application.update({
//       where: { id: application.id },
//       data: updateData,
//     });
//     return new Response(JSON.stringify(updatedApplication), { status: 200 });
//   } catch (error) {
//     console.error('Error updating application:', error);
//     return new Response('Internal Server Error', { status: 500 });
//   }
// }

// export async function DELETE(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const session = await getServerSession(authOptions);

//   if (!session || !session.user) {
//     return new Response('User is not logged in', { status: 401 });
//   }
//   const { email } = session.user;

//   if (!email) {
//     return new Response('Email not found in session', { status: 400 });
//   }

//   try {
//     const usersApp = await prisma.user.findUnique({
//       where: { email },
//       select: {
//         applications: true,
//       },
//     });

//     if (!usersApp) {
//       return new Response('User not found', { status: 404 });
//     }

//     const application = usersApp.applications.find(
//       (app) => app.id === parseInt(params.id)
//     );

//     if (!application) {
//       return new Response('Application not found', { status: 404 });
//     }

//     const deletedApplication = await prisma.application.delete({
//       where: { id: application.id },
//     });

//     return new Response(
//       JSON.stringify({
//         message: 'Job Application has been deleted',
//         deletedApplication,
//       }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Error deleting application:', error);
//     return new Response('Error processing request', { status: 500 });
//   }
// }
