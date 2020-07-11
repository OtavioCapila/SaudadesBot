import twit from 'twit';
import config from './config/environment';

/**
 * @see
 * All keys below are provided by Twitter when you create an new app
 */
const bot = new twit({
  consumer_key: config.CONSUMER_KEY,
  consumer_secret: config.CONSUMER_SECRET,
  access_token: config.ACCESS_TOKEN,
  access_token_secret: config.ACCESS_TOKEN_SECRET,
});

export default bot;
