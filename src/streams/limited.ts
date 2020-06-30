import { Twitter } from 'twit';
import config from './../config/environment';
import logger from '../logger';
import bot from '../bot';

const limitedStream = bot.stream('statuses/filter', {
  track: 'saudades',
});

let lastRequestDate: number;
let lastTweetId: string;
let lastTweetUser: string;

const DELAY = 3600; // 1 hour

const botId = config.BOT_ID;

limitedStream.on('tweet', async (tweet: Twitter.Status) => {
  const tweetUserId = tweet.user.id_str;
  const { filter_level } = tweet;
  const userName = tweet.user.screen_name;

  if (botId === tweetUserId) {
    return;
  }

  if (tweet.id_str === lastTweetId) {
    return;
  }

  if (userName === lastTweetUser) {
    return;
  }

  const now = +new Date();
  const differenceBetweenRequests = (now - lastRequestDate) / 1000;

  if (differenceBetweenRequests < DELAY) {
    return;
  }

  try {
    const tweetId = tweet.id_str;

    const tweetUrl = `https://twitter.com/${userName}/status/${tweetId}`;

    await bot.post('statuses/update', {
      status: `Saudades né minha filha? ${tweetUrl}`,
    });

    lastRequestDate = +new Date();
    lastTweetId = tweetId;
    lastTweetUser = userName;

    logger.log(
      `- LIMITED STREAM - DEBUG - [${filter_level}] - ${tweetUrl} tweet feito com sucesso`
    );
    return;
  } catch (e) {
    logger.error(`- ERROR - ${e}`);
  }
});

limitedStream.on('disconnect', (disconnectMessage) => {
  logger.error(
    `- LIMITED STREAM - ERROR - Desconectado - ${disconnectMessage}`
  );
  limitedStream.start();
});

limitedStream.on('connect', () => {
  logger.log(`- LIMITED STREAM - DEBUG - Conectando`);
});

limitedStream.on('connected', () => {
  logger.log(`- LIMITED STREAM - DEBUG - Conectado`);
});

limitedStream.on('warning', (warning) => {
  logger.warn(`- LIMITED STREAM - WARN - ${warning}`);
});