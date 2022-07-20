import axios from 'axios';
import { USD_KRW_EXCHANGE_RATE_URL } from '../constants/url.constant.js';
import { sendTelegramMessage } from '../helpers/telegram.helper.js';

const fetchData = async (url) => {
  const result = await axios.get(url);

  if (result && result.status === 200 && result.data) {
    return result.data[0];
  }

  return null;
}

const fetchKoreanExchangeRate = async () => {
  const header = '[하나은행]'
  const data = await fetchData(USD_KRW_EXCHANGE_RATE_URL.KEBHANA);

  if (data) {
    const { date, time, basePrice, cashBuyingPrice, cashSellingPrice } = data;
    return `${header} ${date} ${time}\n${basePrice}원 (살 때 ${(basePrice * 1.00175).toFixed(2)})`
  }

  return `${header} 데이터 없음`;
}

const fetchRealtimeExchangeRate = async () => {
  const header = '[야후 파이낸스]'
  const data = await fetchData(USD_KRW_EXCHANGE_RATE_URL.YAHOO);

  if (data) {
    const {date, rate} = data;
    return `${header} ${date}\n${rate}원 (팔 때 ${(rate * 0.99825).toFixed(2)})`
  }

  return `${header} 데이터 없음`;
}

export const fetchAndSendMessage = async () => {

  const koreanExchangeRate = await fetchKoreanExchangeRate();
  const realtimeExchangeRate = await fetchRealtimeExchangeRate();

  sendTelegramMessage(`${koreanExchangeRate}\n\n${realtimeExchangeRate}`);
}