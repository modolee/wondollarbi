import axios from 'axios';
import { TimeHelper, TelegramHelper } from '../helpers';
import { EXCHANGE_RATE_URL } from '../constants/url.constant';
import { CURRENCY, SOURCE } from '../constants/text.constant';

export const fetchAndSendMessage = async () => {
  const koreanExchangeRateUsd = await fetchKoreanExchangeRate(CURRENCY.USD);
  const realtimeExchangeRateUsd = await fetchRealtimeExchangeRate(CURRENCY.USD);

  TelegramHelper.sendTelegramMessage(
    `[${CURRENCY.USD}]\n\n${koreanExchangeRateUsd}\n${realtimeExchangeRateUsd}`
  );

  const koreanExchangeRateJpy = await fetchKoreanExchangeRate(CURRENCY.JPY);
  const realtimeExchangeRateJpy = await fetchRealtimeExchangeRate(CURRENCY.JPY);

  TelegramHelper.sendTelegramMessage(
    `[${CURRENCY.JPY}]\n\n${koreanExchangeRateJpy}\n${realtimeExchangeRateJpy}`
  );
};

export const fetchKoreanExchangeRate = async (
  currency: CURRENCY
): Promise<string> => {
  const hanabank = await fetchKoreanExchangeRateFrom(
    SOURCE.KEBHANA_BANK,
    currency
  );
  const shinhanbank = await fetchKoreanExchangeRateFrom(
    SOURCE.SHINHAN_BANK,
    currency
  );

  return `${hanabank}\n${shinhanbank}`;
};

const fetchRealtimeExchangeRate = async (
  currency: CURRENCY
): Promise<string> => {
  const yahoo = await fetchRealtimeExchangeRateFrom(
    SOURCE.YAHOO_FINANCE,
    currency
  );

  return `${yahoo}`;
};

export const fetchKoreanExchangeRateFrom = async (
  sourceType: SOURCE,
  currency: CURRENCY
): Promise<string> => {
  const header = `[${sourceType}]`;
  const data = await fetchData(EXCHANGE_RATE_URL[currency][sourceType]);

  if (data) {
    const exchangeList = data?.result;
    const value = exchangeList.find(
      (exchange) => exchange.exchangeCode === currency
    );

    const { calcPrice, localTradedAt } = value;
    const formattedDate = TimeHelper.format({
      date: localTradedAt,
    });
    let priceNumber = Number.parseFloat(calcPrice);
    if (currency === CURRENCY.JPY) {
      priceNumber *= 100;
    }

    return `${header} ${formattedDate}\n${priceNumber.toFixed(2)}원 (살 때 ${(
      priceNumber * 1.00175
    ).toFixed(2)})`;
  }

  return `${header} 데이터 없음`;
};

const fetchRealtimeExchangeRateFrom = async (
  sourceType: SOURCE,
  currency: CURRENCY
): Promise<string> => {
  const header = `[${sourceType}]`;
  const data = await fetchArrayData(EXCHANGE_RATE_URL[currency][sourceType]);

  if (data) {
    const { date, rate } = data;
    let priceNumber = rate;
    if (currency === CURRENCY.JPY) {
      priceNumber *= 100;
    }

    return `${header} ${date}\n${priceNumber.toFixed(2)}원 (팔 때 ${(
      priceNumber * 0.99825
    ).toFixed(2)})`;
  }

  return `${header} 데이터 없음`;
};

const fetchArrayData = async (url: string) => {
  const result = await fetchData(url);

  return result && result[0];
};

const fetchData = async (url: string) => {
  const result = await axios.get(url);

  if (result && result.status === 200 && result.data) {
    return result.data;
  }

  return null;
};
