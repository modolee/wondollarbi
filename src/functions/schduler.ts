import cron from 'cron';
import { fetchAndSendMessage } from './fetch';

export const usdKrwExchangeRateJob = new cron.CronJob(
  '1 6 * * *',
  fetchAndSendMessage,
  null,
  false,
  'Asia/Seoul'
);