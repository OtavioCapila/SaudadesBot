import assertExists from 'ts-assert-exists';

export default {
  CONSUMER_KEY: assertExists(process.env.CONSUMER_KEY),
  CONSUMER_SECRET: assertExists(process.env.CONSUMER_SECRET),
  ACCESS_TOKEN: assertExists(process.env.ACCESS_TOKEN),
  ACCESS_TOKEN_SECRET: assertExists(process.env.ACCESS_TOKEN_SECRET),
  BOT_ID: assertExists(process.env.BOT_ID),
  DELAY: assertExists(process.env.DELAY),
};
