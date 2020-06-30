import 'dotenv/config';
import './streams/limited';
import './streams/unlimited';
import logger from './logger';
import express from 'express';

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.log(`- SERVER - Escutando na porta ${port} `);
});
