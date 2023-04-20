import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import { WEB_URL } from "../lib/CONSTANTS";

const ProfileView = () => {
  const { uid } = useParams();
  const [profile, setProfile] = useState({});
  const [profileTweets, setProfileTweets] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const {
        data: { user },
      } = await axios.get(WEB_URL + "/api/users/" + uid);
      setProfile(user);
      const {
        data: { tweets },
      } = await axios.get(WEB_URL + "/api/tweets/" + uid);
      setProfileTweets(tweets);
    };
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <h1 className="text-center">
        Profile view for {profile && profile.name}
      </h1>
    </Container>
  );
};

export default ProfileView;
