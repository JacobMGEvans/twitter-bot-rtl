import Koa from 'koa';
import Router from 'koa-router';
import Luxon from 'luxon';

import Twitter from './initialization.mjs';

const app = new Koa();
const router = new Router();
const port = 3000;

// Experimental modules does not seem to support desctructuring the imports yet
console.log(Luxon.DateTime.local());
/* You can use cron-job.org, uptimerobot.com, or a similar site to hit your /BOT_ENDPOINT to wake up your app and make your Twitter bot tweet. */

console.log('HELLO I AM TWITTER BOT');

router.get('/tweet', async (ctx, next) => {
  const postTweet = (ctx.body = await Twitter.post(
    'statuses/update',
    {
      status: 'Bot says: Attempting to remove duplicate requests  #coding'
    },
    (err, dataTweet, response) => {
      console.log('*******####DATA####*******', dataTweet);

      if (err) console.log('*****######ERROR!!!!', err);
      return response;
    }
  ));
  return postTweet;
});

router.get('/search-tweets', async (ctx, next) => {
  const searchTweets = await Twitter.get(
    'search/tweets',
    { q: 'banana since:2011-07-11', count: 100 },
    function(err, data, response) {
      console.log(data);
    }
  );
});
router.get('/favorite', async (ctx, next) => {});

// Favorite example code
// T.post('favorites/create', id, function(err, response) {
//   // If the favorite fails, log the error message
//   if (err) {
//     console.log(err[0].message);
//   }
//   // If the favorite is successful, log the url of the tweet
//   else {
//     let username = response.user.screen_name;
//     let tweetId = response.id_str;
//     console.log(
//       'Favorited: ',
//       `https://twitter.com/${username}/status/${tweetId}`
//     );
//   }
// });
// retweet in every 50 minutes
// setInterval(retweet, 3000000)
app.use(router.routes()).use(router.allowedMethods());
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
