import { CURRENCY, SOURCE } from '../../constants/text.constant';
import { fetchKoreanExchangeRateFrom } from '../fetch';

describe('Fetch', () => {
  test('Fetch Korean USD', async () => {
    // GIVEN

    // WHEN
    const result = await fetchKoreanExchangeRateFrom(
      SOURCE.SHINHAN_BANK,
      CURRENCY.USD
    );

    // THEN
    expect(result).not.toEqual(`[${SOURCE.SHINHAN_BANK}] 데이터 없음`);
  });
});
