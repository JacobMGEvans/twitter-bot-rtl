import Koa from 'koa';
import Router from 'koa-router';
import Twit from 'twit';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const Twitter = new Twit({
  consumer_key: process.env.KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.TOKEN,
  access_token_secret: process.env.TOKEN_SECRET
});

const app = new Koa();
const router = new Router();
const PORT = process.env.PORT || 3000;
const QUERY_STRING_LIST = `@reactjs OR #javascript OR @parceljs OR #100DaysOfCode OR #CodeNewbie OR #DEVCommunity OR #helpmecode`
console.log('HELLO I AM THE TWITTER BOT');

router.get('/', async (ctx, next) => {
  ctx.body = `HOME ROUTE FOR TWITTER BOT`;
});

router.get('/retweet', async (ctx, next) => {
  const foundIdArray = [];

  const searchTweets = await Twitter.get(
    'search/tweets',
    {
      q: QUERY_STRING_LIST,
      count: 10,
      lang: 'en'
    },
    (err, data, response) => {
      data.statuses.map((_, index) => {
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

router.get('/tweet', async (ctx, next) => {
  // Might change to a stream that happens on an event like follow that sends a message to the user
  // Once  the retweet
  // fetch random wisdom to post from some other API
  const hashesAndStuff = `#javascript #react #node #startup #coding`;
  const dataQuotes = await axios.get(
    'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1'
  );
  const { data } = dataQuotes;
  const { title, content } = data[0];

  const postTweet = await Twitter.post(
    'statuses/update',
    {
      status: `
      " ${content.replace(/<\/?p[^>]*>/g, '')}"
      ~${title}
      ${hashesAndStuff}`
    },
    (err, dataTweet, response) => {
      console.log('*******####DATA####*******', dataTweet);

      err ? console.log('*****######ERROR!!!!', err) : response;
    }
  );
  ctx.body = postMessage;
  return postTweet;
});

router.get('/follow', async (ctx, next) => {
  const queryOptions = `reactjs OR #javascript OR parceljs OR Dan Abramov OR microsoft`;

  const searchUser = axios.get(
    'https://api.twitter.com/1.1/users/search.json?q=reactjs',
    {}
  );
  console.log(await searchUser);
  return searchUser;
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
