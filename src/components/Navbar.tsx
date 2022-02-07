import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import fartazanaLogo from "../assets/jpg/Fartazana-logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  return (
    <div className="navbar">
      <div
        className="logo-image pointer"
        onClick={() => navigate(`/explore/${params.area}`)}
      >
        <img className="logo-navbar" src={fartazanaLogo} alt="logo" />
      </div>
      <div className="menu-options">
        <p
          className="pointer"
          onClick={() => navigate(`/${params.area}/profile`)}
        >
          Olá, {auth.currentUser?.displayName}
        </p>
        <p className="pointer">Carrinho</p>
      </div>
    </div>
  );
};

export default Navbar;
