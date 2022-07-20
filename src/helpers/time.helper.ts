import * as dateFns from 'date-fns';
import * as dateFnsTz from 'date-fns-tz';

export const format = ({
  date,
  format = 'yyyy-MM-dd HH:mm:ss',
  tz = 'Asia/Seoul',
}) => {
  const utcTime = dateFnsTz.zonedTimeToUtc(date, tz);
  return dateFns.format(utcTime, format);
};
