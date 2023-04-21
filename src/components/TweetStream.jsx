import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { WEB_URL } from "../lib/CONSTANTS";

dayjs.extend(relativeTime);

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
          return (
            <div
              key={tweet.id}
              className="flex items-center gap-3 mb-4 mx-auto max-w-lg"
            >
              <img
                src={tweet.user.img}
                alt={tweet.user.name}
                className="w-14 rounded-full"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col gap-2">
                <Link
                  to={`/users/${tweet.user.uid}`}
                  className="flex gap-1 group"
                >
                  <span className="font-medium group-hover:underline">
                    {"@" + tweet.user.name}
                  </span>
                  <span className="opacity-40">•</span>
                  <span className="opacity-40">
                    {dayjs(tweet.created_at).fromNow()}
                  </span>
                </Link>
                <p>{tweet.body}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default TweetStream;
