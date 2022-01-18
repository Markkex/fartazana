import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <div className="navbar">
      <div
        className="logo-image"
        onClick={() => navigate(`/explore/${params.area}`)}
      >
        Logo
      </div>
      <div className="menu-options">
        <p onClick={() => navigate("/sign-in")}>Iniciar Sessão</p>
        <p>Carrinho</p>
      </div>
    </div>
  );
};

export default Navbar;
