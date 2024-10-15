// import { getServerSession } from 'next-auth';
// import dayjs from 'dayjs';
// import { authOptions } from '../../app/api/auth/[...nextauth]/route';

// const fetchApplications = async () => {
//   const session = await getServerSession(authOptions);

//   console.log('Session:', session);

//   try {
//     const response = await fetch('http://localhost:3000/api/getApplications', {
//       headers: { 'Content-Type': 'application/json' },
//       credentials: 'include',
//       cache: 'no-store',
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error('Error fetching applications:', errorData.error);
//     }

//     const data = await response.json();
//   } catch (error) {
//     return 'Error fetching Apps';
//   }
// };

// export { fetchApplications };
