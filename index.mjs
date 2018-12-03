import Koa from 'koa';
import Router from 'koa-router';

import Twitter from './initialization.mjs';

const app = new Koa();
const router = new Router();
const port = 3000;
console.log('HELLO I AM TWITTER BOT');

router.get('/search-retweet', async (ctx, next) => {
  const queryOptions = `#react OR @reactjs #javascript OR #Nodejs`;
  const foundIdSet = new Set();
  const searchTweets = await Twitter.get(
    'search/tweets',
    {
      q: `${queryOptions}`,
      count: 5
    },
    (err, data, response) => {
      // data is an object statuses which is an array of the responses that match the q: parameter
      // data is an object with id that is needed for retweets and likes
      // text in the objecta is the actual tweet
      data.statuses.map((ele, index) => {
        const { id } = data.statuses[index];

        foundIdSet.add(id);
      });

      console.log('*****', foundIdSet, 'SET ID LIST');

      err ? console.log('#*#*#ERROR*#*#*', err) : response;
    }
  );

  // this will be called ForEach status/tweet found and put into the array
  const retweetPost = await foundIdSet.forEach(idElement => {
    while (idElement) {
      Twitter.post(
        'statuses/retweet/:id',
        { id: idElement },
        (err, data, response) => {
          console.log(data, 'RETWEET SUCCESSFUL');
          console.log(response, 'RESPONSE SUCCESSFUL RT');

          err ? console.log('#*#*#ERROR*#*#*', err) : response;
        }
      );
    }
  });

  return [searchTweets, retweetPost];
});

// router.get('/tweet', async (ctx, next) => {
//   // Might change to a stream that happens on an event like follow that sends a message to the user
//   // Once  the retweet
//   const postTweet = (ctx.body = await Twitter.post(
//     'statuses/update',
//     {
//       status: 'Bot says: Attempting to remove duplicate requests  #coding'
//     },
//     (err, dataTweet, response) => {
//       console.log('*******####DATA####*******', dataTweet);

//       if (err) console.log('*****######ERROR!!!!', err);
//       return response;
//     }
//   ));
//   return postTweet;
// });

app.use(router.routes()).use(router.allowedMethods());
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
