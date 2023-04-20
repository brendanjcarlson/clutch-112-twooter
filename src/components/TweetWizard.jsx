import axios from "axios";
import { useContext, useState } from "react";
import { Send } from "react-feather";
import { toast } from "react-hot-toast";
import { z } from "zod";
import Container from "../components/Container";
import { AuthContext } from "../context/AuthProvider";
import { WEB_URL } from "../lib/CONSTANTS";

const TweetWizard = () => {
  const { user } = useContext(AuthContext);

  const [value, setValue] = useState("");
  const [disabled, setDisabled] = useState(true);

  const createTweet = async (value) => {
    const body = {
      user_uid: user.uid,
      body: value,
    };
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    const tweetPromise = axios.post(WEB_URL + "/api/tweets", body, headers);

    toast
      .promise(tweetPromise, {
        loading: "Twooting...🐣",
        success: "Twoot sent!🙂",
        error: "Failed to twoot.😢",
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTweet(value);
    setValue("");
    setDisabled(true);
  };
  const handleChange = (e) => {
    const validator = z.string().emoji().max(255);
    const current = e.target.value;
    try {
      validator.parse(current);
      current.length > 0 ? setDisabled(false) : setDisabled(true);
    } catch (err) {
      setDisabled(true);
      if (current.length !== 0) {
        toast.error("You can only post emojis!🤪", {
          id: "input-error",
          duration: 2000,
        });
      }
    }
    setValue(current);
  };

  if (!user.loggedIn) return;

  return (
    <Container className="mb-4">
      <form
        className="form-control max-w-lg mx-auto flex-row"
        onSubmit={handleSubmit}
      >
        <img
          src={user && user.photoURL}
          alt={user && user.name}
          className="w-14 rounded-full mr-3"
        />
        <div className="input-group">
          <input
            type="text"
            placeholder="Twoot something!"
            className={`input border-slate-400 border-r-0 focus:outline-none grow bg-transparent ${
              !disabled || value.length === 0
                ? "focus:border-primary"
                : "focus:border-error"
            }`}
            value={value}
            onChange={handleChange}
          />
          <button
            className="btn btn-square btn-primary text-white"
            disabled={disabled}
            type="submit"
          >
            <Send size="1rem" />
          </button>
        </div>
      </form>
    </Container>
  );
};

export default TweetWizard;
