import { Twitter } from 'twit';
import config from './../config/environment';
import logger from '../logger';
import bot from '../bot';

const unlimitedStream = bot.stream('statuses/filter', {
  track: ['#SaudadesBot', '@BotSaudades', '#saudades'],
});

const botId = config.BOT_ID;

let lastTweetUser: string;

unlimitedStream.on('tweet', async (tweet: Twitter.Status) => {
  const tweetUserId = tweet.user.id_str;
  const { filter_level } = tweet;
  const userName = tweet.user.screen_name;

  if (botId === tweetUserId) {
    return;
  }

  if (userName === lastTweetUser) {
    return;
  }

  try {
    const tweetId = tweet.id_str;

    const tweetUrl = `https://twitter.com/${userName}/status/${tweetId}`;

    await bot.post('statuses/update', {
      status: `Saudades né minha filha? ${tweetUrl}`,
    });

    lastTweetUser = userName;

    logger.log(
      `- UNLIMITED STREAM - DEBUG - [${filter_level}] - ${tweetUrl} tweet feito com sucesso`
    );
    return;
  } catch (e) {
    logger.error(`- ERROR - ${e}`);
  }
});

unlimitedStream.on('disconnect', (disconnectMessage) => {
  logger.error(
    `- UNLIMITED STREAM - ERROR - Desconectado - ${disconnectMessage}`
  );
  unlimitedStream.start();
});

unlimitedStream.on('connect', () => {
  logger.log(`- UNLIMITED STREAM - DEBUG - Conectando`);
});

unlimitedStream.on('connected', () => {
  logger.log(`- UNLIMITED STREAM - DEBUG - Conectado`);
});

unlimitedStream.on('warning', (warning) => {
  logger.warn(`- UNLIMITED STREAM - WARN - ${warning}`);
});
