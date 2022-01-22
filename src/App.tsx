// React and stuff
import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import Explore from "./pages/Explore";
import ForgotPassword from "./pages/ForgotPassword";
import SearchArea from "./pages/SearchArea";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="/area" element={<SearchArea />} />
          <Route path="/explore/:area" element={<Explore />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </Router>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
