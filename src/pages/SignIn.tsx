import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { email, password } = formData;

  const navigate = useNavigate();

  return (
    <div className="sign-in">
      <div className="sign--container padding-top-3">
        <div className="info--container ">
          <div className="sign-in--logo">{/*Logo*/}</div>
          <div>
            <h3>Sem tempo para ir ao restaurante?</h3>
            <br />
            <p>Pode pedir aqui!</p>
            <p>Basta criares uma conta ou fazeres log in.</p>
            <p>Escolheres a tua área de residência.</p>
            <p>Escolheres o restaurante e a refeição.</p>
            <p>Faz o pagamento.</p>
            <p>E já está!</p>
          </div>
        </div>
        <div className="credentials--container padding-top-3 padding-bottom-3">
          <form>
            <h3 className="txt-align-center">Iniciar Sessão</h3>
            <div>
              <input placeholder="E-mail" type="email" />
            </div>
            <div>
              <input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
              />
            </div>
            <div className="txt-align-center">
              <button>Iniciar Sessão</button>
            </div>
          </form>
          <div className="txt-align-center padding-top-3">
            <Link to="/forgot-password">Esqueceu-se da sua password?</Link>
          </div>
        </div>
      </div>
      <div className="oath--sign-in txt-align-center padding-top-3 padding-bottom-3 ">
        <h3>Ou inicia sessão a partir:</h3>
        <OAuth />
      </div>
      <div className="sign-up--container txt-align-center">
        Se não tem conta podes criar <Link to="/sign-up">aqui</Link>
      </div>
    </div>
  );
};

export default SignIn;
