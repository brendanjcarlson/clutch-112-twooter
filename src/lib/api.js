import axios from "axios";
import { WEB_URL } from "./CONSTANTS";

export const withPromise = (fn, ...args) => {
  const promise = fn(...args);
  return {
    res: wrapPromise(promise),
  };
};

const wrapPromise = (promise) => {
  let status = "pending";
  let result;
  let suspender = promise.then(
    (res) => {
      status = "success";
      result = res;
    },
    (err) => {
      status = "error";
      result = err;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
};

export const getAllTweets = () => {
  console.log("Getting all tweets...");
  return axios
    .get(WEB_URL + "/api/tweets")
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getTweetById = (id) => {
  console.log("Getting tweet by id...");
  return axios
    .get(WEB_URL + "/api/tweets/" + id)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getUsers = () => {
  console.log("Getting all users...");
  return axios
    .get(WEB_URL + "/api/users")
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getUserByUid = (uid) => {
  console.log("Getting user by uid...");
  return axios
    .get(WEB_URL + "/api/users/" + uid)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
