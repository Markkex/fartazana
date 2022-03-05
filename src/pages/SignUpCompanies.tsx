import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import fartazanaLogo from "../assets/jpg/Fartazana-logo.png";
import { createUser } from "../State/action-creators/user/UserActions";
import FormData from "../interface/SignUpCompanies";
const SignUpCompanies = () => {
  const navigate = useNavigate();
  const options = [{ value: "+351", name: "PT +351" }];
  const [formData, setFormData] = useState<FormData>({
    account: "Commercial",
    name: "",
    email: "",
    phone: "",
    extension: "+351",
    password: "",
    establishmentName: "",
    address: "",
    location: "",
  });

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
    } catch (error: any) {
      toast.error("erro" + error);
      console.log(error);
    }
  };
  return (
    <div className="sign-up-companies companies--container--img">
      <div className="logo">
        <img src={fartazanaLogo} className="logo--settings" />
      </div>
      <div className="padding-top-3">
        <h1>Cria conta para o teu comércio!</h1>
      </div>
      <div className="padding-top-3 padding-bottom-3 txt-align-center">
        <form onSubmit={onSubmit}>
          <div>
            <input placeholder="E-Mail" id="email" onChange={onChange} />
          </div>
          <div className="padding-top-3">
            <input placeholder="Nome" id="name" onChange={onChange} />
          </div>
          <div className="padding-top-3">
            <input
              placeholder="Nome do Estabelecimento"
              id="establishmentName"
              onChange={onChange}
            />
          </div>
          <div className="padding-top-3">
            <select id="extension" onChange={onChange}>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
            <input
              placeholder="Número de telefone"
              id="phone"
              onChange={onChange}
            />
          </div>
          <div className="padding-top-3">
            <input placeholder="Morada" id="address" onChange={onChange} />
          </div>
          <div className="padding-top-3">
            <input placeholder="Localidade" id="location" onChange={onChange} />
          </div>
          <div className="padding-top-3">
            <input
              placeholder="password"
              id="password"
              type="password"
              onChange={onChange}
            />
          </div>
          <div className="padding-top-3 txt-align-center">
            <button>Submeter</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpCompanies;
