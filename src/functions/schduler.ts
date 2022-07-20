import cron from 'cron';
import { fetchAndSendMessage } from './fetch';

export const exchangeRateJob = new cron.CronJob(
  '1 6 * * *',
  fetchAndSendMessage,
  null,
  false,
  'Asia/Seoul'
);
