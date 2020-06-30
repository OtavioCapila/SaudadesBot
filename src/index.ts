import twit from 'twit';

const bot = new twit({
  consumer_key: '',
  consumer_secret: '',
  access_token: '',
  access_token_secret: '',
});

const stream = bot.stream('statuses/filter', {
  track: 'saudades',
  tweet_mode: 'extended',
});

stream.on('tweet', async (tweet) => {
  console.log('tweet: ', tweet);
});
