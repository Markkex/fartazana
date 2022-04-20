import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import fartazanaLogo from "../assets/jpg/Fartazana-logo.png";
import { createUser } from "../State/User/UserActionsCreators";
import { useTranslation } from "react-i18next";
import { Button, MenuItem, Select, TextField } from "@mui/material";

const SignUpCompanies = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const options = [{ value: "+351", name: "PT +351" }];
  const [formData, setFormData] = useState({
    account: "Commercial",
    name: "",
    email: "",
    phone: "",
    address: "",
    establishmentName: "",
    extension: "+351",
    password: "",
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
      if (
        formData.name == "" ||
        formData.email == "" ||
        formData.phone == "" ||
        formData.address == "" ||
        formData.establishmentName == "" ||
        formData.password == "" ||
        formData.location == ""
      ) {
        toast.error("Tem que preencher todos os dados. Tente novamente.");
      } else {
        createUser(formData);
        navigate("/");
      }
    } catch (error: any) {
      toast.error("erro" + error);
      console.log(error);
    }
  };
  return (
    <div className="sign-up-companies">
      <div className="padding-top-3">
        <h1>{t("text.commerceCreate")}</h1>
      </div>
      <div className="padding-top-3 padding-bottom-3 txt-align-center">
        <div>
          <TextField label="E-mail" id="email" onChange={onChange} />
        </div>
        <div className="padding-top-3">
          <TextField label={t("text.name")} id="name" onChange={onChange} />
        </div>
        <div className="padding-top-3">
          <TextField
            label={t("text.establishmentName")}
            id="establishmentName"
            onChange={onChange}
          />
        </div>
        <div className="padding-top-3">
          <Select onChange={onChange} id="extension" value={formData.extension}>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
          <TextField label={t("text.phone")} id="phone" onChange={onChange} />
        </div>
        <div className="padding-top-3">
          <TextField
            label={t("text.address")}
            id="address"
            onChange={onChange}
          />
        </div>
        <div className="padding-top-3">
          <TextField label="Localidade" id="location" onChange={onChange} />
        </div>
        <div className="padding-top-3">
          <TextField
            label="password"
            id="password"
            type="password"
            onChange={onChange}
          />
        </div>
        <div className="padding-top-3 txt-align-center">
          <Button variant="outlined" onClick={onSubmit}>
            {t("button.submit")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUpCompanies;
