import Koa from 'koa';
import Router from 'koa-router';
import axios from 'axios';

const router = new Router();

router.get('/retweet', async (ctx, next) => {
  const queryOptions = `#react OR @reactjs #javascript OR #Nodejs`;
  const foundIdArray = [];

  const searchTweets = await Twitter.get(
    'search/tweets',
    {
      q: queryOptions,
      count: 5,
      lang: 'en'
    },
    (err, data, response) => {
      data.statuses.map((ele, index) => {
        console.log(data.statuses[0]);
        const { id_str } = data.statuses[index];
        foundIdArray.push(id_str);
      });

      foundIdArray.forEach(async idElement => {
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
      err ? console.error('#*#*#ERROR*#*#*', err) : response;
    }
  );
  ctx.body(searchTweets);
  return searchTweets;
});
