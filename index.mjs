import Koa from 'koa';
import Twitter from './initialization.mjs';

const app = new Koa();
const port = 3000;

/* You can use cron-job.org, uptimerobot.com, or a similar site to hit your /BOT_ENDPOINT to wake up your app and make your Twitter bot tweet. */

console.log('HELLO I AM TWITTER BOT');

app.use(
  async ctx =>
    (ctx.body = Twitter.post(
      'statuses/update',
      { status: 'Test using #Koa #server' },
      (err, dataTweet, response) => {
        console.log('*******####DATA####*******', dataTweet);

        if (err) console.log('*****######ERROR!!!!', err);
      }
    ))
);

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
// retweet in every 50 minutes
// setInterval(retweet, 3000000)
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
