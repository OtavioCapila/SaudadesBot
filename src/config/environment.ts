import assertExists from 'ts-assert-exists';

export default {
  CONSUMER_KEY: assertExists(process.env.CONSUMER_KEY,'Consumer key not provided'),
  CONSUMER_SECRET: assertExists(process.env.CONSUMER_SECRET,'Consumer secret not provided'),
  ACCESS_TOKEN: assertExists(process.env.ACCESS_TOKEN,'Access token not provided'),
  ACCESS_TOKEN_SECRET: assertExists(process.env.ACCESS_TOKEN_SECRET,'Access token secret not provided'),
  BOT_ID: assertExists(process.env.BOT_ID,'Bot id not provided'),
  DELAY: Number(assertExists(process.env.DELAY,'Delay not provided')),
};
