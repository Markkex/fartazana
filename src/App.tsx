// React and stuff
import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";

// Pages
import Explore from "./pages/Explore";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import SearchArea from "./pages/SearchArea";
import SignIn from "./pages/SignIn";
import SignUpCompanies from "./pages/SignUpCompanies";
import SignUp from "./pages/SignUp";

import { UserProvider } from "./State/User/UserContext";

function App() {
  return (
    <Fragment>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<SearchArea />} />
            </Route>

            <Route path="/sign-up" element={<SignUp />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="/area" element={<SearchArea />} />
            <Route path="/explore/:area" element={<Explore />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up-company" element={<SignUpCompanies />} />
            <Route path="/:area/profile" element={<Profile />} />
          </Routes>
        </Router>
        <ToastContainer />
      </UserProvider>
    </Fragment>
  );
}

export default App;
