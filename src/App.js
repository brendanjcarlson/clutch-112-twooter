import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { AppContainer } from "./components/Container";
import Navbar from "./components/Navbar";
import "./styles/globals.css";
import HomeView from "./views/HomeView";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Toaster containerClassName="mt-16" />
      <AppContainer>
        <Routes>
          <Route path="/" element={<HomeView />}/>
        </Routes>
      </AppContainer>
    </div>
  );
}

export default App;
