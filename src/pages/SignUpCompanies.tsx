import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createUser } from "../State/User/UserActionsCreators";
import { useTranslation } from "react-i18next";
import { Button, MenuItem, Select, TextField } from "@mui/material";

const SignUpCompanies = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const options = [{ value: "+351", name: "+351" }];
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
        formData.name === "" ||
        formData.email === "" ||
        formData.phone === "" ||
        formData.address === "" ||
        formData.establishmentName === "" ||
        formData.password === "" ||
        formData.location === ""
      ) {
        toast.error(t("text.dataFill"));
      } else {
        createUser(formData);
        navigate("/");
      }
    } catch (error: any) {
      toast.error(t("messages.generalError"));
    }
  };
  return (
    <div className="sign-up-companies">
      <div className="padding-top-3">
        <h1>{t("text.commerceCreate")}</h1>
      </div>
      <div className="padding-top-3 padding-bottom-3 txt-align-center">
        <div>
          <TextField
            className="input"
            label="E-mail"
            id="email"
            onChange={onChange}
          />
        </div>
        <div className="padding-top-3">
          <TextField
            className="input"
            label={t("text.name")}
            id="name"
            onChange={onChange}
          />
        </div>
        <div className="padding-top-3">
          <TextField
            className="input"
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
          <TextField
            className="input-phone"
            label={t("text.phone")}
            id="phone"
            onChange={onChange}
          />
        </div>
        <div className="padding-top-3">
          <TextField
            className="input"
            label={t("text.address")}
            id="address"
            onChange={onChange}
          />
        </div>
        <div className="padding-top-3">
          <TextField
            className="input"
            label="Localidade"
            id="location"
            onChange={onChange}
          />
        </div>
        <div className="padding-top-3">
          <TextField
            className="input"
            label="Password"
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
