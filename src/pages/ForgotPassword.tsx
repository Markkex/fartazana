import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import fartazanaLogo from "../assets/jpg/Fartazana-logo.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const onChange = (e: any) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Foi enviado email para redifinição de password.");
      navigate("/");
    } catch (error) {
      toast.error("Não foi possivel enviar e-mail.");
    }
  };

  return (
    <div className="forgot-password">
      <div className="logo">
        <img src={fartazanaLogo} className="logo--settings" />
      </div>
      <h1 className="padding-top-3">Esqueceu a sua password?</h1>
      <div className="padding-top-3">
        <form onSubmit={onSubmit}>
          <div className="text-align-center">
            <input onChange={onChange} placeholder="E-mail" />
          </div>
          <div className="txt-align-center padding-top-3">
            <button type="submit">Recuperar</button>
          </div>
        </form>
        <div className="padding-top-3">
          <Link to="/">Voltar ao menu inicial.</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
