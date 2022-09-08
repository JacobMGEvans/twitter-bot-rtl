import Koa from "koa";
import Router from "koa-router";
import Twit from "twit";
import dotenv from "dotenv";
import got from "got";

dotenv.config();

const Twitter = new Twit({
  consumer_key: process.env.KEY ?? "",
  consumer_secret: process.env.CONSUMER_SECRET ?? "",
  access_token: process.env.TOKEN,
  access_token_secret: process.env.TOKEN_SECRET,
});

const app = new Koa();
const router = new Router();
const PORT = process.env.PORT || 3000;
const QUERY_STRING_LIST = `#100DaysOfCode OR #CodeNewbie OR #DEVCommunity OR #helpmecode`;
console.log("HELLO I AM THE TWITTER BOT");

router.get("/", async (ctx) => {
  ctx.body = `HOME ROUTE FOR TWITTER BOT`;
});

router.get("/retweet", (ctx) => {
  const foundIdArray: string[] = [];
  const searchTweets = Twitter.get(
    "search/tweets",
    {
      q: QUERY_STRING_LIST,
      count: 10,
      lang: "en",
    },
    (err, data, response) => {
      type RetweetData = { statuses: { id_str: string }[] };
      (data as RetweetData).statuses.map((status) => {
        console.log(status);
        const { id_str } = status;
        foundIdArray.push(id_str);
      });

      foundIdArray.forEach((idElement) => {
        console.log(idElement, "ELEMENT ID ");
        if (idElement) {
          const retweetId = Twitter.post(
            "statuses/retweet/:id",
            { id: idElement },
            (err, data, response) => {
              console.log(data, "RETWEET SUCCESSFUL");

              err ? console.log("#*#*#ERROR*#*#*", err) : response;
            }
          );
          return retweetId;
        } else {
          throw new Error("ERROR IN RETWEET MISSING ERROR");
        }
      });
      err ? console.error("#*#*#ERROR*#*#*", err) : response;
    }
  );
  console.log(searchTweets);
  ctx.body(searchTweets);
  return searchTweets;
});

router.get("/tweet", async (ctx, _) => {
  const hashesAndStuff = `#javascript #react #node #startup #coding`;
  const {
    data: dataQuotes,
  }: { data: { data: { title: string; content: string }[] } } = await got(
    "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1"
  ).json();
  const { data } = dataQuotes;
  const { title, content } = data[0];

  const postTweet = Twitter.post(
    "statuses/update",
    {
      status: `
      " ${content.replace(/<\/?p[^>]*>/g, "")}"
      ~${title}
      ${hashesAndStuff}`,
    },
    (err, dataTweet, response) => {
      console.log("*******####DATA####*******", dataTweet);

      err ? console.log("*****######ERROR!!!!", err) : response;
    }
  );
  ctx.body = postTweet;
  return postTweet;
});

router.get("/follow", async () => {
  const { data: searchUser }: { data: object } = await got(
    "https://api.twitter.com/1.1/users/search.json?q=reactjs",
    {}
  ).json();
  console.log(searchUser);
  return searchUser;
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
