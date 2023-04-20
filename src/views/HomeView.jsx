import Container from "../components/Container";
import TweetStream from "../components/TweetStream";

const HomeView = () => {
  return (
    <Container>
      <h1 className="text-center mb-4">Home View</h1>
      <TweetStream />
    </Container>
  );
};

export default HomeView;
