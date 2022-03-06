import { useState, FC, useContext } from "react";
import fartazanaLogo from "../assets/jpg/Fartazana-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";
import { createUser } from "../State/User/UserActionsCreators";

const SignUp = () => {
  const [formData, setFormData] = useState({
    account: "Consumer",
    name: "",
    email: "",
    password: "",
    phone: "",
    extension: "+351",
  });

  const navigate = useNavigate();

  const onChange = (e: any) => {
    setFormData((prevState: any) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      createUser(formData);
      navigate("/");
    } catch (error) {
      toast.error("Algo correu mal ao criar a sua conta. Tente novamente");
    }
  };

  return (
    <div className="sign-up">
      <div className="logo">
        <img src={fartazanaLogo} className="logo--settings" />
      </div>
      <div>
        <div className="padding-top-3 padding-bottom-3 txt-align-center">
          <form onSubmit={onSubmit}>
            <h3>Cria a tua conta!</h3>
            <div className="padding-top-1">
              <input
                placeholder="Nome"
                type="text"
                id="name"
                onChange={onChange}
              />
            </div>
            <div className="padding-top-1">
              <input
                placeholder="E-mail"
                type="email"
                id="email"
                onChange={onChange}
              />
            </div>
            <div className="padding-top-1">
              <select
                id="extension"
                value={formData.extension}
                onChange={onChange}
              >
                <option value="+351">+351</option>
              </select>
              <input
                placeholder="Telemóvel"
                type="phone"
                id="phone"
                onChange={onChange}
              />
            </div>
            <div className="padding-top-1">
              <input
                placeholder="Password"
                type="password"
                id="password"
                onChange={onChange}
              />
            </div>
            <div className="padding-top-1">
              <button type="submit">Criar Conta</button>
            </div>
          </form>
        </div>
      </div>

      <OAuth />

      <div>
        <Link to="/">Voltar à página inicial</Link>
      </div>
    </div>
  );
};

export default SignUp;
