import Koa from 'koa';
import Router from 'koa-router';

import Twitter from './initialization.mjs';

const app = new Koa();
const router = new Router();
const port = 3000;
console.log('HELLO I AM TWITTER BOT');

router.get('/retweet', async (ctx, next) => {
  const queryOptions = `#react OR @reactjs #javascript OR #Nodejs`;
  const foundIdSet = new Set();
  const searchTweets = await Twitter.get(
    'search/tweets',
    {
      q: `${queryOptions}`,
      count: 5
    },
    (err, data, response) => {
      data.statuses.map((ele, index) => foundIdSet.add({id}) = data.statuses[index] );
      err ? console.log('#*#*#ERROR*#*#*', err) : response;
    }
  );

  const arrayOfSet = await Array.from(foundIdSet);
  console.log(arrayOfSet, 'ARRAY FROM SET');
  // foundIdSet.forEach(async idElement => {
  //   console.log(idElement, 'ID ELEMENT!#@!@!!@!@@#@#$!');
  //   while (idElement) {
  //     const retweetId = await Twitter.post(
  //       'statuses/retweet/:id',
  //       { id: idElement },
  //       (err, data, response) => {
  //         console.log(data, 'RETWEET SUCCESSFUL');

  //         err ? console.log('#*#*#ERROR*#*#*', err) : response;
  //       }
  //     );
  //     return retweetId;
  //   }
  // });
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
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
