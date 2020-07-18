import { Twitter } from 'twit';
import config from '../config/environment';

interface ValidateTweetProps {
  streamType: 'unlimited' | 'limited';
  botId: string;
  lastTweetId: string;
  lastTweetDate: number;
  tweet: Twitter.Status;
  delay?: number;
}

const validateTweet = ({
  botId,
  lastTweetDate,
  lastTweetId,
  tweet,
  delay,
  streamType,
}: ValidateTweetProps): boolean => {
  const delayBetweenTweets = delay || config.DELAY;

  const { user, id_str: tweetId } = tweet;
  const { id_str: tweetUserId } = user;

  const now = +new Date();
  const differenceBetweenRequests = (now - lastTweetDate) / 1000;

  /**
   * Prevent from create a new tweet before the delay defined in config.ts
   */
  if (differenceBetweenRequests < delayBetweenTweets) {
    return false;
  }

  /**
   * Prevent from retweet self tweets
   */
  if (tweetUserId === botId) {
    return false;
  }

  /**
   * Prevent from retweet the previous tweet
   */
  if (tweetId === lastTweetId) {
    return false;
  }

  if (streamType === 'unlimited' && tweet.is_quote_status) {
    return false;
  }

  if (tweet.possibly_sensitive) {
    return false;
  }

  if (tweet.in_reply_to_status_id) {
    return false;
  }

  return true;
};

export default validateTweet;
