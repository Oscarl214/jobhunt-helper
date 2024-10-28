// import NextAuth, { NextAuthOptions } from 'next-auth';
// import { getServerSession } from 'next-auth';
// import prisma from '@/lib/prisma';
// import { authOptions } from '../auth/[...nextauth]/route';
// import { select } from '@nextui-org/react';

// export async function POST(request: Request) {
//   const session = await getServerSession(authOptions);

//   if (!session || !session.user) {
//     return new Response('User is not logged in', { status: 401 });
//   }

//   const { email } = session.user;

//   if (!email) {
//     return new Response('Email not found in session', { status: 400 });
//   }

//   const { jobtitle, company, status, resume, coverletter, dateapplied, notes } =
//     await request.json();

//   try {
//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user) {
//       return new Response('User not found', { status: 404 });
//     }

//     const userId = user.id;

//     const jobApplication = await prisma.application.create({
//       data: {
//         jobtitle,
//         company,
//         status,
//         dateapplied,
//         resume,
//         coverletter,
//         notes,
//         ownerId: userId,
//       },
//     });

//     return new Response(JSON.stringify(jobApplication), { status: 200 });
//   } catch (error) {
//     console.error('Error processing request:', error);
//     return new Response('Error processing request', { status: 500 });
//   }
// }
