// React and stuff
import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import Explore from "./pages/Explore";
import SearchArea from "./pages/SearchArea";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<SearchArea />} />
          <Route path="/explore/:area" element={<Explore />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </Router>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
