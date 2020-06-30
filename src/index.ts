import 'dotenv/config';
import twit, { Twitter } from 'twit';
import config from './config/environment';
import logger from './logger';
import express from 'express';

const app = express();

const port = process.env.PORT || 3000;

const bot = new twit({
  consumer_key: config.CONSUMER_KEY,
  consumer_secret: config.CONSUMER_SECRET,
  access_token: config.ACCESS_TOKEN,
  access_token_secret: config.ACCESS_TOKEN_SECRET,
});

const stream = bot.stream('statuses/filter', {
  track: ['saudades', '#SaudadesBot', '@BotSaudades'],
});

let lastRequestDate: number;

const DELAY = 36; // 36 seconds

stream.on('tweet', async (tweet: Twitter.Status) => {
  const botId = config.BOT_ID;
  const tweetUserId = tweet.user.id_str;
  const { filter_level } = tweet;

  if (filter_level === 'none') {
    logger.log('- DEBUG - Tweet filtrado');
    return;
  }

  if (botId === tweetUserId) {
    logger.log(`- DEBUG - Ignorando meus RTs`);
    return;
  }

  const now = +new Date();
  const differenceBetweenRequests = (now - lastRequestDate) / 1000;

  if (differenceBetweenRequests < DELAY) {
    return;
  }

  try {
    const tweetId = tweet.id_str;
    const userName = tweet.user.screen_name;

    const tweetUrl = `https://twitter.com/${userName}/status/${tweetId}`;

    await bot.post('statuses/update', {
      status: `Saudades né minha filha? ${tweetUrl}`,
    });

    lastRequestDate = +new Date();

    logger.log(
      `- DEBUG - [${filter_level}] - ${tweetUrl} tweet feito com sucesso`
    );
  } catch (e) {
    logger.error(`- ERROR - ${e}`);
  }
});

app.listen(port, () => {
  logger.log(`- SERVER - Escutando na porta ${port} `);
});
