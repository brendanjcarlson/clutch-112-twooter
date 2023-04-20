import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link, useParams } from "react-router-dom";
import { getAllTweets, withPromise } from "../lib/api";

dayjs.extend(relativeTime);

const resource = withPromise(getAllTweets);

const filterByUser = (tweets, uid) => {
  return tweets.filter((tweet) => tweet.user.uid === uid);
};

const TweetStream = () => {
  const { uid } = useParams();
  const res = resource.res.read();
  const tweets = uid ? filterByUser(res.tweets, uid) : res.tweets;

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
