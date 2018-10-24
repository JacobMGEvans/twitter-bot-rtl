import Twitter from './twitter-init.mjs';

console.log('HELLO I AM TWITTER BOT');

const retweet = async () => {
  const params = {
    q: '#nodejs, #Nodejs',
    result_type: 'recent',
    lang: 'en'
  };

  Twitter.get('search/tweets', params, (err, data) => {
    // if there no errors
    console.log('I GOT THE DATA IN GET', data);
    if (!err) {
      // grab ID of tweet to retweet
      const retweetId = data.statuses[0].id_str;
      // Tell TWITTER to retweet
      Twitter.post(
        'statuses/retweet/:id',
        {
          id: retweetId
        },
        (err, response) => {
          if (response) {
            console.log('Retweeted!!!', response);
          }
          // if there was an error while tweeting
          err ? console.log('ERROR POST/TWEETING RESPONSE', err) : null;
        }
      )
        .then(response => console.log('REPONSE!!!!', response.json()))
        .catch(error => console.log('ERROR!!! IN CATCH', error));
    }
  });
};

retweet().then(next => process.exit());

// retweet in every 50 minutes
// setInterval(retweet, 3000000)
