// import NextAuth, { NextAuthOptions } from 'next-auth';
// import { getServerSession } from 'next-auth';
// import prisma from '@/lib/prisma';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// interface User {
//   email: string;
//   name: string;
// }
// export async function GET(request: Request) {
//   const session = await getServerSession(authOptions);
//   const email = session?.user?.email;

//   if (!email) {
//     return new Response(
//       JSON.stringify({ error: 'Email not found in session' }),
//       {
//         status: 400,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   }

//   try {
//     const usersApps = await prisma.user.findUnique({
//       where: { email },
//       select: {
//         applications: {
//           orderBy: {
//             dateapplied: 'desc',
//           },
//         },
//       },
//     });

//     return new Response(JSON.stringify(usersApps), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Error fetching users applications:', error);
//     return new Response(
//       JSON.stringify({ error: 'Error fetching job details' }),
//       { status: 500, headers: { 'Content-Type': 'application/json' } }
//     );
//   }
// }
