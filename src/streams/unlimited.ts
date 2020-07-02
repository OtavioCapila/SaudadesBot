import { UpdatedTwitterStatus } from '../types';
import config from './../config/environment';
import logger from '../logger';
import bot from '../bot';

const unlimitedStream = bot.stream('statuses/filter', {
  track: ['#SaudadesBot', '@BotSaudades', '#saudades'],
});

const botId = config.BOT_ID;

let lastTweetUser: string;

unlimitedStream.on('tweet', async (tweet: UpdatedTwitterStatus) => {
  const { user } = tweet;
  const { id_str: tweetUserId, screen_name: tweetUserName } = user;

  if (tweet.is_quote_status) {
    logger.log(`- UNLIMITED STREAM - DEBUG - Is quote status`);
    return;
  }

  if (tweet.possibly_sensitive) {
    logger.log(`- UNLIMITED STREAM - DEBUG - Is possibly sensitive`);
    return;
  }

  if (tweet.in_reply_to_status_id) {
    logger.log(`- UNLIMITED STREAM - DEBUG - Is a reply to another status`);
    return;
  }

  if (tweetUserId === botId) {
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

    lastTweetUser = tweetUserName;

    logger.log(
      `- UNLIMITED STREAM - DEBUG - ${tweetUrl} tweet feito com sucesso`
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
