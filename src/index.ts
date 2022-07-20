import express from 'express';
import http from 'http';
import { usdKrwExchangeRateJob } from './functions/schduler';
import { fetchAndSendMessage } from './functions/fetch';

const startServer = () => {
  const app = express();
  const server = http.createServer(app);

  app.get('/health', (req, res, next) => {
    res.status(200).json({ status: 200, messages: 'Healthy' });
  });

  app.get('/qhsownj', (req, res, next) => {
    fetchAndSendMessage();
    res.status(200).json({ status: 200, messages: 'Success' });
  });

  server.listen(process.env.PORT || 8080, () => {
    console.log(`WonDollArbi is listening on port 8080`);
  });
};

usdKrwExchangeRateJob.start();
startServer();
