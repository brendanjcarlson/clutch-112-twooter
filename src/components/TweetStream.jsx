import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
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
                <a href={`/users/${tweet.user.uid}`} className="flex gap-1">
                  <span className="font-medium">
                    {userNameHack(tweet.user)}
                  </span>
                  <span>-</span>
                  <span className="opacity-40 font-normal">
                    {dayjs(tweet.created_at).fromNow()}
                  </span>
                </a>
                <p>{tweet.body}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default TweetStream;
