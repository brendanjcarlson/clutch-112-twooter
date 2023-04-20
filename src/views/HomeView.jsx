import { Suspense } from "react";
import Container from "../components/Container";
import LoadingBar from "../components/Loading";
import TweetStream from "../components/TweetStream";
import TweetWizard from "../components/TweetWizard";

const HomeView = () => {
  return (
    <Container>
      <h1 className="text-center mb-4">Home View</h1>
      <TweetWizard />
      <Suspense fallback={<LoadingBar />}>
        <TweetStream />
      </Suspense>
    </Container>
  );
};

export default HomeView;
