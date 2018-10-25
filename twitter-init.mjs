import TwitterInit from 'twit';
import dotenv from 'dotenv';
dotenv.config();

const initializeConfig = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
};

const Twitter = new TwitterInit(initializeConfig);
export default Twitter;
