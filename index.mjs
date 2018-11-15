const Koa = require('koa');
const Twit = require('twit');
const Router = require('koa-router');

const dotenv = require('dotenv');
dotenv.config();

const initializeConfig = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
};

const app = new Koa();
const router = new Router();
const Twitter = new Twit(initializeConfig);

/* You can use cron-job.org, uptimerobot.com, or a similar site to hit your /BOT_ENDPOINT to wake up your app and make your Twitter bot tweet. */

router.get('/tweet', async (ctx, next) => {
  console.log('HELLO I AM TWITTER BOT');

  const Post = await (ctx.body = Twitter.post(
    'statuses/update',
    { status: 'First Tweet, Hello World?' },
    (err, dataTweet, response) => {
      console.log('*******####DATA####*******', dataTweet);

      if (err) console.log('*****######ERROR!!!!', err);
    }
  ));

  return Post;
});

// Favorite example code
// T.post('favorites/create', id, function(err, response){
//   // If the favorite fails, log the error message
//   if(err){
//     console.log(err[0].message);
//   }
//   // If the favorite is successful, log the url of the tweet
//   else{
//     let username = response.user.screen_name;
//     let tweetId = response.id_str;
//     console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
//   }
// });
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
console.log(`Your bot is running on port 3000`);

// retweet in every 50 minutes
// setInterval(retweet, 3000000)
