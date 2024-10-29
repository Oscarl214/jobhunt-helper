import OpenAI from 'openai';

const apiKey = process.env.CHAT_API;
const openai = new OpenAI({ apiKey: apiKey });

export async function POST(request: Request) {
  const { topic } = await request.json();

  const jobsDetails = `I am looking for job boards that list positions in the following fields: 
    full stack developer, front end developer, and backend developer. 
    These positions should be entry-level and located in Dallas, Texas, or available remotely.
    Please provide job boards that specifically target tech positions, entry-level opportunities, 
    and both large, well-known platforms and niche, smaller job boards.
    Only share job boards and do not include individual job listings. Share the link to the job boards. `;

  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are an assistant that helps users
           find job boards based on specific fields and criteria. ${jobsDetails}`,
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
