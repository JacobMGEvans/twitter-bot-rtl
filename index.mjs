import Koa from 'koa';
import Router from 'koa-router';
import Luxon from 'luxon';

import Twitter from './initialization.mjs';

const app = new Koa();
const router = new Router();
const port = 3000;

// Experimental modules does not seem to support desctructuring the imports yet
const dateDayAgo = Luxon.DateTime.local()
  .setZone('America/Los_Angeles')
  .minus({ days: 1 })
  .endOf('day').c;

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
    {
      q: `#reactjs since:${dateDayAgo.year}-${dateDayAgo.day}-${
        dateDayAgo.month
      }`,
      count: 10
    },
    (err, data, response) => {
      // data is an object with id that is needed for retweets and likes
      // text in the objecta is the actual tweet
      console.log(data);

      if (err) console.log('#*#*#ERROR*#*#*', err);
      return response;
    }
  );
  return searchTweets;
});

router.get('/retweet', async (ctx, next) => {
  Twitter.post('statuses/retweet/:id', { id: '343360866131001345' }, function(
    err,
    data,
    response
  ) {
    console.log(data);
  });
});

router.get('/favorite', async (ctx, next) => {
  Twitter.post('favorites/create');
});
// retweet in every 50 minutes
// setInterval(retweet, 3000000)
app.use(router.routes()).use(router.allowedMethods());
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
