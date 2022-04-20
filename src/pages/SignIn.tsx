import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import OAuth from "../components/OAuth";
import { Button, Input, TextField } from "@mui/material";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { email, password } = formData;
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      <div className="padding-top-3">
        <div className="padding-top-3 padding-bottom-3">
          <h3 className="txt-align-center">{t("text.login")}</h3>
          <div className="padding-top-3">
            <TextField
              label="E-mail"
              type="email"
              id="email"
              onChange={onChange}
              variant="outlined"
            />
          </div>
          <div className="padding-top-3">
            <TextField
              label="Password"
              type="password"
              id="password"
              onChange={onChange}
              variant="outlined"
            />
          </div>
          <div className="txt-align-center padding-top-3">
            <Button onClick={onSubmit} variant="contained">
              {t("text.login")}
            </Button>
          </div>

          <div className="txt-align-center padding-top-3">
            <div>
              <Link to="/forgot-password">{t("text.forgotPassword")}</Link>
            </div>
          </div>
        </div>
      </div>

      <OAuth />

      <div className="sign-up--container txt-align-center padding-top-3 padding-bottom-3">
        <p>
          <Link to="/sign-up">{t("text.createAccount")}</Link>
        </p>
        <p className="padding-top-3">
          <Link to="/sign-up-company">{t("text.signInCompanies")}</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
