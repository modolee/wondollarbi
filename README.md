# WonDollArbi (Won + Dollar + Arbitrage)

- 달러/원, 엔/원 차익거래를 위한 알림

# 전송 주기

- 매일 아침 6시 1분 (KST 기준) 한국은행들의 환율과 세계 실시간 환율을 텔레그램으로 전송
- 수정을 원하면 `./src/functions/scheduler.ts` 파일에서 전송 Cron 수식 수정

```sh
1 6 * * *
```

# 환경변수

```sh
PORT: Server Port Number (Default: 8080)
TELEGRAM_TOKEN: Telegram API Access Token
TELEGRAM_CHAT_ID: Telegram Chat ID
```

- 프로젝트 루트에 set-env.sh 파일 생성하면 실행 시 자동으로 환경변수 주입

```sh
export PORT=""
export TELEGRAM_TOKEN=""
export TELEGRAM_CHAT_ID=""
```

- 파일 생성 후 실행 권한을 추가해야 됨

```sh
chmod +x ./set-env.sh
```

# 참고

- [텔레그램 Token, ChatID 확인 방법](https://chancoding.tistory.com/149)
