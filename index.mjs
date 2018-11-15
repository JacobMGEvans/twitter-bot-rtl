const Twit = require('twit');
const Koa = require('koa');

const dotenv = require('dotenv');
dotenv.config();

const initializeConfig = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
};

const Twitter = new Twit(initializeConfig);
const app = new Koa();

/* You can use cron-job.org, uptimerobot.com, or a similar site to hit your /BOT_ENDPOINT to wake up your app and make your Twitter bot tweet. */
app.use(async ctx => {
  console.log('HELLO I AM TWITTER BOT');

  const Post = await (ctx.body = Twitter.post(
    'statuses/update',
    { status: 'First Tweet, Missing Hello World?' },
    (err, data, response) => {
      console.log('*******DATA*******', data);
      console.log('RESPONSE', response.header);

      if (err) console.log('ERROR!!!!', err);
    }
  ));
  return Post;
});
// ctx.body = Twitter.get(
//   'account/verify_credentials',
//   { skip_status: true },
//   (err, response) => {
//     console.log('DATA!!!! RESPONSESSSSSSSS', data);
//   }
// );
/* The example below tweets out "Hello world!". */

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
app.listen(3000);
console.log(`Your bot is running on port 3000`);

// retweet in every 50 minutes
// setInterval(retweet, 3000000)
