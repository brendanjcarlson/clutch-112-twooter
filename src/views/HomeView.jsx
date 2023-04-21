import Container from "../components/Container";
import TweetStream from "../components/TweetStream";
import TweetWizard from "../components/TweetWizard";

const HomeView = () => {
  return (
    <Container>
      <h1 className="text-center mb-4">Home View</h1>
      <TweetWizard />
      <TweetStream />
    </Container>
  );
};

export default HomeView;
