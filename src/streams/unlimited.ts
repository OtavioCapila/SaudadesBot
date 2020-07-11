import { UpdatedTwitterStatus } from "../types";
import config from "./../config/environment";
import logger from "../logger";
import bot from "../bot";
import isValidTweet from "../utils/validateTweet";
import setupListeners from "../utils/setupListeners";

/**
 * @see
 * https://developer.twitter.com/en/docs/tweets/filter-realtime/api-reference/post-statuses-filter
 */
const unlimitedStream = bot.stream("statuses/filter", {
  track: ["#SaudadesBot", "@BotSaudades", "#saudades"],
  result_type: "recent",
});

const streamType = "UNLIMITED STREAM";

const botId = config.BOT_ID;

const delay = 1200; // 20 minutes

let lastTweetDate: number;
let lastTweetId: string;

unlimitedStream.on("tweet", async (tweet: UpdatedTwitterStatus) => {
  const { user, id_str: tweetId } = tweet;
  const { screen_name: tweetUserName } = user;

  const tweetUrl = `https://twitter.com/${tweetUserName}/status/${tweetId}`;

  if (
    !isValidTweet({
      botId,
      tweet,
      delay,
      lastTweetDate,
      lastTweetId,
      streamType: "unlimited",
    })
  ) {
    return;
  }

  try {
    await bot.post("statuses/update", {
      status: `Saudades né minha filha? ${tweetUrl}`,
    });

    lastTweetDate = +new Date();
    lastTweetId = tweetId;

    logger.log(`- ${streamType} - ${tweetUrl} tweet feito com sucesso`);
    return;
  } catch (e) {
    logger.error(e);
  }
});

/**
 * Setup listeners
 * Just to see what's going on =)
 */
setupListeners(unlimitedStream,'UNLIMITED');
