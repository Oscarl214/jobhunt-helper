import { Erica_One } from 'next/font/google';

export async function fetchApplications() {
  try {
    const res = await fetch('http://localhost:3000/api/getApplications', {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch applications');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw error;
  }
}
