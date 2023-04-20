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
      if (res.data.status === "ok") {
        const newTweets = res.data.tweets;
        setTweets(newTweets);
      }
    };
    getTweets();
  }, []);

  const userNameHack = ({ name, uid }) => {
    const nameArr = name.split(" ").join("-").toLowerCase();
    const uidSlice = uid.split("").slice(0, 6).join("");
    return `@${nameArr}-${uidSlice}`;
  };

  return (
    <div className="flex flex-col gap-4 mx-auto max-w-lg">
      {tweets &&
        tweets.map((tweet) => {
          return (
            <div key={tweet.id} className="flex items-center gap-3">
              <img
                src={tweet.user.img}
                alt={tweet.user.name}
                className="w-14 rounded-full"
              />
              <div className="flex flex-col gap-2">
                <Link
                  to={`/users/${tweet.user.uid}`}
                  className="flex gap-1 group"
                >
                  <span className="font-medium group-hover:underline">
                    {userNameHack(tweet.user)}
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
