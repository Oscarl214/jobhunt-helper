export async function fetchApplications(session: any) {
  try {
    const res = await fetch('http://localhost:3000/api/getApplications', {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw error;
  }
}
