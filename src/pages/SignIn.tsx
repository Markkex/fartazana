import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ReactComponent as VisibilityIcon } from "../assets/svg/visibilityIcon.svg";
import fartazanaLogo from "../assets/jpg/Fartazana-logo.png";

import OAuth from "../components/OAuth";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate("/area");
      }
    } catch (error) {
      toast.error("Uma das credênciais não está correta. Tente novamente.");
    }
  };

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
          <form onSubmit={onSubmit}>
            <h3 className="txt-align-center">Iniciar Sessão</h3>
            <div>
              <input
                placeholder="E-mail"
                type="email"
                id="email"
                onChange={onChange}
              />
            </div>
            <div>
              <input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={onChange}
              />
              <VisibilityIcon
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>
            <div className="txt-align-center">
              <button>Iniciar Sessão</button>
            </div>
          </form>
          <div
            className="txt-align-center padding-top-3"
            onClick={() => navigate("forgot-password")}
          >
            <Link to="/forgot-password">Esqueceu-se da sua password?</Link>
          </div>
        </div>
      </div>
      <div className="oath--sign-in txt-align-center padding-top-3 padding-bottom-3 ">
        <h3>Ou inicia sessão com:</h3>
        <OAuth />
      </div>
      <div className="sign-up--container txt-align-center">
        Se não tens conta podes criar <Link to="/sign-up">aqui!</Link>
      </div>
    </div>
  );
};

export default SignIn;
