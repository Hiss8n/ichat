import cron from 'cron';
import axios from 'axios';

const { CronJob } = cron;

const cronJobs = () => {
  const job = new CronJob(
    '*/14 * * * *',
    async () => {
      try {
        await axios.get('http://localhost:3000/');
        console.log('Cron job: pinged / successfully');
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
