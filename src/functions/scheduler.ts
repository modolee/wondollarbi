import cron from 'cron';
import { DEFAULT_TIMEZONE } from '../constants/time.constant';
import { fetchAndSendMessage } from './fetch';

export const exchangeRateJob = new cron.CronJob(
  '1 6 * * *',
  fetchAndSendMessage,
  null,
  false,
  DEFAULT_TIMEZONE
);
