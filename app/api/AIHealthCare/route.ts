import OpenAI from 'openai';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/authoptions';
import { error } from 'console';
const apiKey = process.env.CHAT_API;
const openai = new OpenAI({ apiKey: apiKey });

interface Job {
  title: string;
  company: string;
  location: string;
  datePosted: string;
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  const { topic } = await request.json();

  const jobsDetails = `I am looking for job boards that list positions in the following fields: 
  health educator, health science degree holders, patient care tech, patient service representative, 
  PAS specialist, patient financial account specialist, and ambulatory representative. 
  These positions should be entry-level (less than a year of experience) and located in Dallas, Texas, 
  or remote from anywhere. Please focus on job boards that are tailored to healthcare jobs, 
  entry-level positions, and include both well-known and niche job boards. 
  Do not respond with job listings, only provide job boards that fit these criteria. Respond with the links to the job boards also.`;

  try {
    if (!session) {
      return new Response('User is not logged in', { status: 401 });
    }

    const response = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are an assistant that helps users find relevant job boards based on the specific details they provide. ${jobsDetails}.`,
        },
        {
          role: 'user',
          content: topic,
        },
      ],
      model: 'gpt-4',
      max_tokens: 300,
    });
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error('Error fetching job details:', error);
    return new Response('Error fetching job details', { status: 500 });
  }
}
