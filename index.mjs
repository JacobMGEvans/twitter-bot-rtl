import Koa from 'koa';
import Router from 'koa-router';

import Twitter from './initialization.mjs';

const app = new Koa();
const router = new Router();
const PORT = 3000;

console.log('HELLO I AM TWITTER BOT');

router.get('/retweet', async (ctx, next) => {
  const queryOptions = `#react OR @reactjs #javascript OR #Nodejs`;
  const foundIdArray = [];

  const searchTweets = await Twitter.get(
    'search/tweets',
    {
      q: queryOptions,
      count: 5
    },
    (err, data, response) => {
      data.statuses.map((ele, index) => {
        console.log(data.statuses[0]);
        const { id_str } = data.statuses[index];
        foundIdArray.push(id_str);
      });

      const retweetFromIds = foundIdArray.forEach(async idElement => {
        // const stringifiedNumbner = idElement.toString();
        console.log(idElement, 'ELEMENT ID ');
        if (idElement) {
          const retweetId = await Twitter.post(
            'statuses/retweet/:id',
            { id: idElement },
            (err, data, response) => {
              console.log(data, 'RETWEET SUCCESSFUL');

              err ? console.log('#*#*#ERROR*#*#*', err) : response;
            }
          );
          return retweetId;
        } else {
          throw new Error('ERROR IN RETWEET MISSING ERROR');
        }
      });
      err ? console.log('#*#*#ERROR*#*#*', err) : response;
    }
  );

  return searchTweets;
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
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
