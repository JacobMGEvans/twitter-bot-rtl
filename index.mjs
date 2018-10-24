import Twitter from './twitter-init.mjs';
import Koa from 'koa';

const app = new Koa();
console.log('HELLO I AM TWITTER BOT');

app.use(express.static('public'));

/* You can use cron-job.org, uptimerobot.com, or a similar site to hit your /BOT_ENDPOINT to wake up your app and make your Twitter bot tweet. */

app.all('/' + process.env.BOT_ENDPOINT, function(req, res) {
  /* The example below tweets out "Hello world!". */
  Twitter.post('statuses/update', { status: 'hello world 👋' }, function(
    err,
    data,
    response
  ) {
    if (err) {
      console.log('error!', err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

const listener = app.listen(process.env.PORT, function() {
  console.log('Your bot is running on port ' + listener.address().port);
});

// retweet in every 50 minutes
// setInterval(retweet, 3000000)
