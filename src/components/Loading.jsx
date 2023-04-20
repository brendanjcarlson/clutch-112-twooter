import Container from "./Container";

const LoadingBar = () => {
  return (
    <Container className="flex justify-center">
      <progress className="progress w-full max-w-lg mx-auto"></progress>
    </Container>
  );
};

export default LoadingBar;
