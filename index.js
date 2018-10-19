import { Twitter } from './twitter-init';

console.log('HELLO I AM TWITTER BOT');
const retweet = () => {
  const params = {
    q: '#nodejs, #Nodejs', // REQUIRED
    result_type: 'recent',
    lang: 'en'
  };

  Twitter.get('search/tweets', params, (err, data) => {
    // if there no errors
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
          if (err) {
            console.log(
              'Something went wrong while RETWEETING... Duplication maybe...'
            );
          }
        }
      );
    }
    // if unable to Search a tweet
    else {
      console.log('Something went wrong while SEARCHING...');
    }
  });
};
