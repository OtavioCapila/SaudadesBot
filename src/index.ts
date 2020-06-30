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

const limitedStream = bot.stream('statuses/filter', {
  track: 'saudades',
});

const unlimitedStream = bot.stream('statuses/filter', {
  track: ['#SaudadesBot', '@BotSaudades', '#saudades'],
});

let lastRequestDate: number;
let lastTweetId: string;

const DELAY = 36; // 36 seconds

const botId = config.BOT_ID;

// Stream with delay between RT's
limitedStream.on('tweet', async (tweet: Twitter.Status) => {
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

  if (tweet.id_str === lastTweetId) {
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
    lastTweetId = tweetId;

    logger.log(
      `- LIMITED STREAM - DEBUG - [${filter_level}] - ${tweetUrl} tweet feito com sucesso`
    );
    return;
  } catch (e) {
    logger.error(`- ERROR - ${e}`);
  }
});

// Stream without delay between RT's
unlimitedStream.on('tweet', async (tweet: Twitter.Status) => {
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

  try {
    const tweetId = tweet.id_str;
    const userName = tweet.user.screen_name;

    const tweetUrl = `https://twitter.com/${userName}/status/${tweetId}`;

    await bot.post('statuses/update', {
      status: `Saudades né minha filha? ${tweetUrl}`,
    });

    logger.log(
      `- UNLIMITED STREAM - DEBUG - [${filter_level}] - ${tweetUrl} tweet feito com sucesso`
    );
    return;
  } catch (e) {
    logger.error(`- ERROR - ${e}`);
  }
});

app.listen(port, () => {
  logger.log(`- SERVER - Escutando na porta ${port} `);
});
