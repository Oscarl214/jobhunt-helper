export const scrapeJobs = async () => {
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    'https://www.linkedin.com/jobs/search/?currentJobId=4040139583&f_WT=1%2C2%2C3&keywords=healthcare&origin=JOB_SEARCH_PAGE_JOB_FILTER&refresh=true',
    { waitUntil: 'networkidle2' }
  );

  await page.waitForSelector('.scaffold-layout__list-container');

  const jobs = await page.evaluate(() => {
    const jobElements = document.querySelectorAll(
      '.scaffold-layout__list-container'
    );
    const jobList: Array<{
      title: string;
      company: string;
      location: string;
      datePosted: string;
    }> = [];

    jobElements.forEach((job) => {
      const title = job.querySelector('.result-card__title')?.textContent;
      const company = job.querySelector('.result-card__subtitle')?.textContent;
      const location = job.querySelector('.result-card__location')?.textContent;
      const datePosted = job.querySelector(
        '.result-card__posted-date'
      )?.textContent;

      if (title && company && location && datePosted) {
        jobList.push({ title, company, location, datePosted });
      }
    });
    return jobList;
  });

  await browser.close();
  return jobs;
};

export async function GET(request: Request) {
  let data = await scrapeJobs();

  return new Response(JSON.stringify(data), { status: 200 });
}
