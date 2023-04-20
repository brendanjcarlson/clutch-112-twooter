import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import LoadingBar from "../components/Loading";
import TweetStream from "../components/TweetStream";
import { WEB_URL } from "../lib/CONSTANTS";

const ProfileView = () => {
  const { uid } = useParams();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const getData = async () => {
      const {
        data: { user },
      } = await axios.get(WEB_URL + "/api/users/" + uid);
      setProfile(user);
    };
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <h1 className="text-center mb-4">
        Profile view for {profile && profile.name}
      </h1>
      <Suspense fallback={<LoadingBar />}>
        <TweetStream />
      </Suspense>
    </Container>
  );
};

export default ProfileView;
