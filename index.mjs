import Koa from 'koa';
import Router from 'koa-router';
import Twit from 'twit';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

const Twitter = new Twit({
  consumer_key: process.env.KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.TOKEN,
  access_token_secret: process.env.TOKEN_SECRET
});

const app = new Koa();
const router = new Router();
const PORT = 3000;

console.log('HELLO I AM THE TWITTER BOT');

router.get('/retweet', (ctx, next) => {
  const findAndRetweet = async () => {
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
  };
});

router.get('/tweet', async (ctx, next) => {
  // Might change to a stream that happens on an event like follow that sends a message to the user
  // Once  the retweet
  // fetch random wisdom to post from some other API
  const hashesAndStuff = `#javascript #react #node #startup #coding @AudeaDev`;
  const dataQuotes = await fetch(
    'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=mycallback',
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }
  );
  console.log(dataQuotes.headers);

  // const postTweet = await Twitter.post(
  //   'statuses/update',
  //   {
  //     status: `${dataQuotes} ${hashesAndStuff}`
  //   },
  //   (err, dataTweet, response) => {
  //     console.log('*******####DATA####*******', dataTweet);

  //     err ? console.log('*****######ERROR!!!!', err) : response;
  //   }
  // );

  // ctx.body(postTweet);
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
