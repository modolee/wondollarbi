import { SOURCE, CURRENCY } from './text.constant';

export const EXCHANGE_RATE_URL = {
  [CURRENCY.USD]: {
    [SOURCE.YAHOO_FINANCE]: 'https://api.manana.kr/exchange/rate/KRW/USD.json',
    [SOURCE.SHINHAN_BANK]:
      'https://m.stock.naver.com/api/json/marketindex/marketIndexExchangeListCalcJson?bankType=SHB',
    [SOURCE.KEBHANA_BANK]:
      'https://m.stock.naver.com/api/json/marketindex/marketIndexExchangeListCalcJson?bankType=HNB',
  },
  [CURRENCY.JPY]: {
    [SOURCE.YAHOO_FINANCE]: 'https://api.manana.kr/exchange/rate/KRW/JPY.json',
    [SOURCE.SHINHAN_BANK]:
      'https://m.stock.naver.com/api/json/marketindex/marketIndexExchangeListCalcJson?bankType=SHB',
    [SOURCE.KEBHANA_BANK]:
      'https://m.stock.naver.com/api/json/marketindex/marketIndexExchangeListCalcJson?bankType=HNB',
  },
};
