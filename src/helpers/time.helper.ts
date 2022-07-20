import { DEFAULT_TIMEZONE } from '../constants/time.constant';
import * as dateFns from 'date-fns';
import * as dateFnsTz from 'date-fns-tz';

export const format = ({
  date,
  format = 'yyyy-MM-dd HH:mm:ss',
  tz = DEFAULT_TIMEZONE,
}) => {
  const zonedTime = dateFnsTz.utcToZonedTime(new Date(date), tz);
  return dateFns.format(zonedTime, format);
};
