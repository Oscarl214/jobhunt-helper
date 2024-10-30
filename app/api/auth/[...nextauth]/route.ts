import NextAuth from 'next-auth';

import { authOptions } from '@/app/lib/authoptions';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

//working as intended
//testing new remote url
