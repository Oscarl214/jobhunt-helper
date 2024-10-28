import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../../lib/prisma';
import { authOptions } from '@/app/lib/authoptions';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

///
