import OpenAI from 'openai';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { error } from 'console';

const apiKey = process.env.CHAT_API;
const openai = new OpenAI({ apiKey: apiKey });

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  const { topic } = await request.json();

  const jobsDetails = `Full stack developer, 
    front end developer, backend developer. 
   Within Dallas, or fully remote. Keep it entry level. Return 3 new positions every time you get prompted. Don't reply back to me, only reply the job postings. `;

  try {
    if (!session) {
      return new Response('User is not logged in', { status: 401 });
    }

    const response = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are an assistant that will help me find jobs within the prompted field.
           Only share job postings based on the details I provide & the prompt selected.
           Share different openings upon being prompted. Share only postings from this year and list when the posting was posted.
           Here they are: ${jobsDetails}`,
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
