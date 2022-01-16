import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchArea from "./pages/SearchArea";

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<SearchArea />} />
        </Routes>
      </Router>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
