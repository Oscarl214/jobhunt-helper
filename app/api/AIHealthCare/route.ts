import OpenAI from 'openai';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
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

  const puppeteer = require('puppeteer');

  // const scrapeJobs = async (): Promise<Job[]> => {
  //   const browser = await puppeteer.launch();
  //   const page = await browser.newPage();
  //   await page.goto(
  //     'https://www.linkedin.com/jobs/search/?currentJobId=4040139583&f_WT=1%2C2%2C3&keywords=healthcare&origin=JOB_SEARCH_PAGE_JOB_FILTER&refresh=true',
  //     { waitUntil: 'networkidle2' }
  //   );

  //   await page.waitForSelector('.scaffold-layout__list-container');

  //   const jobs = await page.evaluate(() => {
  //     const jobElements = document.querySelectorAll(
  //       '.scaffold-layout__list-container'
  //     );
  //     const jobList: Job[] = [];
  //     jobElements.forEach((job) => {
  //       const title = job.querySelector('.result-card__title')?.textContent;
  //       const company = job.querySelector(
  //         '.result-card__subtitle'
  //       )?.textContent;
  //       const location = job.querySelector(
  //         '.result-card__location'
  //       )?.textContent;
  //       const datePosted = job.querySelector(
  //         '.result-card__posted-date'
  //       )?.textContent;

  //       if (title && company && location && datePosted) {
  //         jobList.push({ title, company, location, datePosted });
  //       }
  //     });
  //     return jobElements;
  //   });

  //   await browser.close();
  //   return jobs;
  // };

  // let data = await scrapeJobs();

  // console.log(data);

  const jobsDetails = `Help me find open positions for the
   following: health educator, health science degree,patient care tech,
    patient service representative,PAS specialist, patient financial account specialist, 
    ambulatory representative. Preferably the jobs to be entry level or less than a year
    expierence and located in Dallas, Texas or remote from anywhere.
    Only share job postings based on the details I provide & the prompt selected.
    Don't reply back to me, only reply the job postings. List also when the position was posted.`;

  try {
    if (!session) {
      return new Response('User is not logged in', { status: 401 });
    }

    const response = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are an assistant that will help me 
          find job postings within my field based on the specific 
          details I provide, referred to as ${jobsDetails}.`,
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
