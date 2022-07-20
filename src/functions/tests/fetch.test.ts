import {
  fetchKoreanExchangeRate,
  fetchKoreanExchangeRateFromShinhanbank,
} from '../fetch';

describe('Fetch', () => {
  test('Fetch Korean USD', async () => {
    // GIVEN

    // WHEN
    const result = await fetchKoreanExchangeRate();

    // THEN
    console.log({ result });
  });
  test('Fetch Naver USD - SHINHAN', async () => {
    // GIVEN
    // WHEN
    const result = await fetchKoreanExchangeRateFromShinhanbank();

    // THEN
    console.log({ result });
  });
});
