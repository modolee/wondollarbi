import express from 'express';
import http from 'http';
import { exchangeRateJob } from './functions/scheduler';
import { fetchAndSendMessage } from './functions/fetch';
const PORT = Number.parseInt(process.env.PORT, 10) || 8080;

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

  server.listen(PORT, () => {
    console.log(`WonDollArbi is listening on port ${PORT}`);
  });
};

exchangeRateJob.start();
startServer();
