import cron from 'cron';
import axios from 'axios';




const { CronJob } = cron;

const cronJobs = () => {
  const job = new CronJob(
    '*/14 * * * *',
    async () => {
      try {
        await axios.get(process.env.BACKEND_URL);
      } catch (error) {
        console.error('Cron job failed:', error.message);
      }
    },
    null,
    true,
    'UTC'
  );

  return job;
};

export default cronJobs;
