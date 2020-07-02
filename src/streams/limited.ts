import { UpdatedTwitterStatus } from '../types';
import config from './../config/environment';
import logger from '../logger';
import bot from '../bot';

const limitedStream = bot.stream('statuses/filter', {
  track: 'saudades',
  result_type: 'recent',
});

let lastRequestDate: number;
let lastTweetId: string;
let lastTweetUser: string;

const delayBetweenTweets = Number(config.DELAY);

logger.log(`- DEBUG - Delay de ${delayBetweenTweets} segundos`);

const botId = config.BOT_ID;

limitedStream.on('tweet', async (tweet: UpdatedTwitterStatus) => {
  const { user } = tweet;
  const { id_str: tweetUserId, screen_name: tweetUserName } = user;

  const now = +new Date();
  const differenceBetweenRequests = (now - lastRequestDate) / 1000;

  if (differenceBetweenRequests < delayBetweenTweets) {
    return;
  }

  if (tweet.possibly_sensitive) {
    return;
  }

  if (tweet.in_reply_to_status_id) {
    return;
  }

  if (botId === tweetUserId) {
    return;
  }

  if (tweet.id_str === lastTweetId) {
    return;
  }

  if (tweetUserName === lastTweetUser) {
    return;
  }

  try {
    const tweetId = tweet.id_str;

    const tweetUrl = `https://twitter.com/${tweetUserName}/status/${tweetId}`;

    await bot.post('statuses/update', {
      status: `Saudades né minha filha? ${tweetUrl}`,
    });

    lastRequestDate = +new Date();
    lastTweetId = tweetId;
    lastTweetUser = tweetUserName;

    logger.log(
      `- LIMITED STREAM - DEBUG - ${tweetUrl} tweet feito com sucesso`
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
