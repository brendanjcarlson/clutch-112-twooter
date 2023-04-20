import axios from "axios";
import { useEffect, useState } from "react";
import { WEB_URL } from "../lib/CONSTANTS";

const TweetStream = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const getTweets = async () => {
      const res = await axios.get(WEB_URL + "/api/tweets");
      console.log(res);
      if (res.data.status === "ok") {
        const newTweets = res.data.tweets;
        setTweets(newTweets);
      }
    };
    getTweets();
  }, []);

  return (
    <div>
      {tweets &&
        tweets.map((tweet) => {
          console.log(tweet);
          return <div key={tweet.id}>{tweet.body}</div>;
        })}
    </div>
  );
};

export default TweetStream;
