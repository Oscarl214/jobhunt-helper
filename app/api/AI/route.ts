import OpenAI from 'openai';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { error } from 'console';
const apiKey = process.env.CHAT_API;
const openai = new OpenAI({ apiKey: apiKey });

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  const jobsDetails = `Help me find open positions for the
   following: health educator, health science degree,patient care tech,
    patient service representative,PAS specialist, patient financial account specialist, 
    ambulatory representative. Preferably the jobs to be entry level or less than a year
    expierence and located in Dallas, Texas or remote from anywhere. Also help me find jobs for a full stack developer, front end developer, backend developer. Also within Dallas, or fully remote. Keep it entry level.`;

  try {
    if (!session) {
      return new Response('User is not logged in', { status: 401 });
    }

    const response = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are an assistant that will help me and my partner find jobs within our fields. Only share job postings based on the details we provide. Here they are: ${jobsDetails}`,
        },
        {
          role: 'user',
          content:
            'Please provide the latest job postings based on the job details above.Give back each job posting as its own object.',
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
