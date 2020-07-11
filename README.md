# Saudades Bot :robot:

This is the official repo of the [SaudadesBot](https://twitter.com/BotSaudades). Below i'll explain how it works :arrow_down:

## How to run the bot

> You need to copy `.env.example` to `.env` and fill with the needed data

#### Start the app with nodemon
> yarn start-dev

#### Generate the build(this will delete the build folder)
> yarn build

#### Start the app from the build files
> yarn start

#### Lint code
> yarn lint


### Actual repo structure
```
saudades-bot
 ├── .env.example
 ├── .eslintignore
 ├── .eslintrc 
 ├── package.json
 ├── README.md
 ├─> src
 │   ├── bot.ts
 │   ├─> config
 │   │   └── environment.ts
 │   ├── index.ts
 │   ├── logger.ts
 │   ├─> streams
 │   │   ├── limited.ts
 │   │   └── unlimited.ts
 │   ├── types.ts
 │   └─> utils
 │       ├── setupListeners.ts
 │       └── validateTweet.ts
 ├── tsconfig.json
 └── yarn.lock
```

#### `src > config > environment.ts`
It's where we load all of our environment variables, do type conversion and stuff like that, and export everything as a single object;

#### `src > bot.ts`
Export a new instance of the bot, created using the variables from `environment.ts`;

#### `src > index.ts`
Where we load the environment variables and initiate both `streams`;

#### `src > streams`
Here is where the magic happens. We have 2 types of streams, `LIMITED` and `UNLIMITED`. I'll explain more about they:
 - `LIMITED` stream has a `delay` between each tweet due to API rate limit(300 tweets in a window of 3 hours). This stream is supposed to be used with commonly used words, so you'll have an infinite amount of tweets =);
 - `UNLIMITED` this stream doesn't have any kind of delay, **BUT** you will use this one only when you want to do something after an user quote the bot or use an hashtag. E.g: `#missyou`,`@YourBotName`;

 #### `src > types > types.ts`
 I had to create that custom type due to the outdated types from `twit` library. But lucky for you, i've already opened an PR to fix that. Click [here](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/45854) to see more details;

 #### `src > utils`
  - `setupListeners.ts` create listeners for each `stream`, and log to the console;
  - `validateTweet.ts` all the logic to determine if the bot must create a new tweet or not;

#### `src > logger`
A simple logger to help find what's is going on with the bot.
E.g: `[2020-07-11T01:52:11.669Z] - UNLIMITED - https://twitter.com/BotSaudades/status/1281767641368211456 tweet feito com sucesso`

  ## Contributing
   - Fork this repo
   - Make the needed change
   - Setup a pull request
   - Wait for approval =)