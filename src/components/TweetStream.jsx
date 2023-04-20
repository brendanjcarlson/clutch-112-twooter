import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link, useParams } from "react-router-dom";
import { z } from "zod";
import { getAllTweets, withPromise } from "../lib/api";

dayjs.extend(relativeTime);

const resource = withPromise(getAllTweets);

const filterByUser = (tweets, uid) => {
  return tweets.filter((tweet) => tweet.user.uid === uid);
};

const filterByEmoji = (tweets) => {
  return tweets.filter(({ body }) => {
    const validator = z.string().emoji();
    let keep = true;
    try {
      validator.parse(body);
    } catch (err) {
      keep = false;
    }
    return keep;
  });
};

const applyFilters = (tweets, uid) => {
  const filteredByUser = uid ? filterByUser(tweets, uid) : tweets;
  return filterByEmoji(filteredByUser);
};

const userNameHack = ({ name, uid }) => {
  const nameArr = name.split(" ").join("-").toLowerCase();
  const uidSlice = uid.split("").slice(0, 6).join("");
  return `@${nameArr}-${uidSlice}`;
};

const TweetStream = () => {
  const { uid } = useParams();
  const res = resource.res.read();
  const tweets = uid ? applyFilters(res.tweets, uid) : res.tweets;

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
                referrerPolicy="no-referrer"
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
