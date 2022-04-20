import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import fartazanaLogo from "../assets/jpg/Fartazana-logo.png";
import { Button, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { width } from "@mui/system";
import Navbar from "../components/Navbar";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const { t } = useTranslation();
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
      <h1 className="padding-top-3">{t("text.forgotPassword")}</h1>
      <div className="padding-top-3">
        <div className="text-align-center">
          <TextField
            id="email"
            label="E-mail"
            variant="outlined"
            onChange={onChange}
            style={{ width: "300px" }}
          />
        </div>
        <div className="txt-align-center padding-top-3">
          <Button variant="contained" onClick={onSubmit}>
            {t("button.recover")}
          </Button>
        </div>

        <div className="padding-top-3">
          <Link to="/">{t("text.returnToMenu")}</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
