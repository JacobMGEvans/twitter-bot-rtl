import TwitterPackage from 'twit';
import dotenv from 'dotenv';
dotenv.config();

const initializeConfig = {
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
  accessTokenKey: process.env.ACCESS_TOKEN_KEY,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET
};

const Twitter = new TwitterPackage(initializeConfig);
export default Twitter;
