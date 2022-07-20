import axios from 'axios';
import {
  NAVER_STOCK_URL,
  USD_KRW_EXCHANGE_RATE_URL,
} from '../constants/url.constant';
import { sendTelegramMessage } from '../helpers/telegram.helper';

export const fetchAndSendMessage = async () => {
  const koreanExchangeRate = await fetchKoreanExchangeRate();
  const realtimeExchangeRate = await fetchRealtimeExchangeRate();

  sendTelegramMessage(`${koreanExchangeRate}\n\n${realtimeExchangeRate}`);
};

export const fetchKoreanExchangeRate = async () => {
  const hanabank = await fetchKoreanExchangeRateFromHanabank();
  const shinhanbank = await fetchKoreanExchangeRateFromShinhanbank();

  return `${hanabank}\n${shinhanbank}`;
};

const fetchRealtimeExchangeRate = async () => {
  const yahoo = await fetchRealtimeExchangeRateFromYahoo();

  return `${yahoo}`;
};

export const fetchKoreanExchangeRateFromShinhanbank = async () => {
  const header = '[신한은행]';
  const data = await fetchData(NAVER_STOCK_URL.SHINHAN);

  if (data) {
    const exchangeList = data?.result;
    const usd = exchangeList.find(
      (exchange) => exchange.exchangeCode === 'USD'
    );

    const { closePrice: priceString, localTradedAt } = usd;
    const priceNumber = Number.parseFloat(priceString.replace(',', ''));

    return `${header} ${localTradedAt}\n${priceNumber}원 (살 때 ${(
      priceNumber * 1.00175
    ).toFixed(2)})`;
  }

  return `${header} 데이터 없음`;
};

const fetchKoreanExchangeRateFromHanabank = async () => {
  const header = '[하나은행]';
  const data = await fetchArrayData(USD_KRW_EXCHANGE_RATE_URL.KEBHANA);

  if (data) {
    const { date, time, basePrice, cashBuyingPrice, cashSellingPrice } = data;
    return `${header} ${date} ${time}\n${basePrice}원 (살 때 ${(
      basePrice * 1.00175
    ).toFixed(2)})`;
  }

  return `${header} 데이터 없음`;
};

const fetchRealtimeExchangeRateFromYahoo = async () => {
  const header = '[야후 파이낸스]';
  const data = await fetchArrayData(USD_KRW_EXCHANGE_RATE_URL.YAHOO);

  if (data) {
    const { date, rate } = data;
    return `${header} ${date}\n${rate}원 (팔 때 ${(rate * 0.99825).toFixed(
      2
    )})`;
  }

  return `${header} 데이터 없음`;
};

const fetchArrayData = async (url) => {
  const result = await fetchData(url);

  return result && result[0];
};

const fetchData = async (url) => {
  const result = await axios.get(url);

  if (result && result.status === 200 && result.data) {
    return result.data;
  }

  return null;
};
