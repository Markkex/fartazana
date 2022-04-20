import { useState, FC, useContext } from "react";
import fartazanaLogo from "../assets/jpg/Fartazana-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";
import { createUser } from "../State/User/UserActionsCreators";
import { useTranslation } from "react-i18next";
import { Button, MenuItem, Select, TextField } from "@mui/material";

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
  const { t } = useTranslation();

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
      toast.error(t("messages.generalError"));
    }
  };

  return (
    <div className="sign-up">
      <div>
        <div className="padding-top-3 padding-bottom-3 txt-align-center">
          <form onSubmit={onSubmit}>
            <h3>{t("text.createAccount")}</h3>
            <div className="padding-top-1">
              <TextField
                label={t("text.name")}
                type="text"
                id="name"
                onChange={onChange}
              />
            </div>
            <div className="padding-top-1">
              <TextField
                label="E-mail"
                type="email"
                id="email"
                onChange={onChange}
              />
            </div>
            <div className="padding-top-1">
              <Select
                id="extension"
                value={formData.extension}
                onChange={onChange}
              >
                <MenuItem value={formData.extension}>+351</MenuItem>
              </Select>
              <TextField
                label={t("text.phone")}
                type="phone"
                id="phone"
                onChange={onChange}
              />
            </div>
            <div className="padding-top-1">
              <TextField
                label="Password"
                type="password"
                id="password"
                onChange={onChange}
              />
            </div>
            <div className="padding-top-1">
              <Button onClick={onSubmit} variant="outlined">
                {t("text.createAccount")}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <OAuth />

      <div>
        <Link to="/">{t("text.returnToLogin")}</Link>
      </div>
    </div>
  );
};

export default SignUp;
