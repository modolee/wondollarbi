import axios from 'axios';
import { TELEGRAM } from '../constants/env.constant';

/**
 * TELEGRAM CHAT ID 확인 방법
 * https://api.telegram.org/bot{TELEGRAM_TOKEN}/getUpdates
 * Bot이랑 같이 있는 방에서 채팅 후 위의 URL에서 확인
 */

const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM.TOKEN}/sendMessage?chat_id=${TELEGRAM.CHAT_ID}&parse_mode=HTML&text=`;

export const sendTelegramMessage = async (message: string): Promise<void> => {
  try {
    const sendMessageApi = TELEGRAM_API_URL + encodeURI(message);
    await axios.get(sendMessageApi);
  } catch (err) {
    console.error(err);
  }
};
