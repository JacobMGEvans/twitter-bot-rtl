import Koa from 'koa';
import Router from 'koa-router';
import axios from 'axios';

const router = new Router();

const tweet = router.get('/tweet', async (ctx, next) => {
  // Might change to a stream that happens on an event like follow that sends a message to the user
  // Once  the retweet
  // fetch random wisdom to post from some other API
  const hashesAndStuff = `#javascript #react #node #startup #coding @AudeaDev`;
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

  return postTweet;
});

export default tweet;
