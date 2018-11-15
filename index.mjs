import Twit from 'twit';
import Koa from 'koa';
import 'babel-register';

import dotenv from 'dotenv';
dotenv.config();

const initializeConfig = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
};

const Twitter = new Twit(initializeConfig);

// require the rest of the app that needs to be transpiled after the hook
const app = new Koa();
/* You can use cron-job.org, uptimerobot.com, or a similar site to hit your /BOT_ENDPOINT to wake up your app and make your Twitter bot tweet. */
app.use(async ctx => {
  console.log('HELLO I AM TWITTER BOT');

  // ctx.body = Twitter.get(
  //   'account/verify_credentials',
  //   { skip_status: true },
  //   (err, response) => {
  //     console.log('DATA!!!! RESPONSESSSSSSSS', data);
  //   }
  // );
  /* The example below tweets out "Hello world!". */
  ctx.body = Twitter.post(
    'statuses/update',
    { status: 'hello world 👋' },
    (err, data, response) => {
      console.log('RESPONSE', response.headers);
      console.log('DATA', data);
      if (err) console.log('ERROR!!!!', err);
    }
  );
});

app.listen(3000);
console.log(`Your bot is running on port 3000`);

// retweet in every 50 minutes
// setInterval(retweet, 3000000)
