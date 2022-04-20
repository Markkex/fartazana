import React, { useState, FC } from "react";
import Navbar from "../components/Navbar";
import { getAuth, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getUser,
  updateName,
  updatePhone,
} from "../State/User/UserActionsCreators";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, TextField } from "@mui/material";

const Profile: FC = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = useSelector((state: any) => state.user.user);
  const [loading, setLoading] = useState(true);
  const [changeDetails, setChangeDetails] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    formDataName: auth.currentUser?.displayName,
    formDataEmail: auth.currentUser?.email,
    formDataPhone: auth.currentUser?.phoneNumber,
  });

  const { formDataName, formDataEmail, formDataPhone } = formData;

  useEffect(() => {
    const getUserCredentials = async () => {
      const getUserData = await getUser();
      dispatch({ type: "GET_USER", payload: getUserData });
    };
    getUserCredentials();
    setLoading(false);
  }, [auth]);

  const logout = () => {
    auth.signOut();
    navigate("/");
  };

  if (loading) {
    <Spinner />;
  }

  const onChange = (e: any) => {
    setFormData((prevState: any) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser?.displayName !== formDataName) {
        updateName(formDataName);
      }
      if (auth.currentUser?.phoneNumber !== formDataPhone) {
        updatePhone(formDataPhone);
      }
      toast.success(t("messages.updateComplete"));
    } catch (error) {
      toast.error(t("messages.failedUpdate"));
    }
  };
  return (
    <div>
      <div id="recaptcha-container"></div>
      <header>
        <h1 className="txt-align-center padding-top-3">
          {t("text.personalDetails")}
        </h1>
      </header>
      <div className="container">
        <div>
          <div className="options--profile">
            <div>
              <Button
                variant={changeDetails ? "contained" : "outlined"}
                color={changeDetails ? "success" : "primary"}
                onClick={() => {
                  changeDetails && onSubmit();
                  setChangeDetails((prevState) => !prevState);
                }}
              >
                {changeDetails
                  ? t("button.updateInformations")
                  : t("button.changeInformations")}{" "}
              </Button>
            </div>
            <div className="logout">
              <Button onClick={logout} variant="outlined" color="error">
                Logout
              </Button>
            </div>
          </div>

          <div className="padding-top-3">
            <TextField
              id="formDataName"
              label={t("text.name")}
              variant="outlined"
              value={formDataName!}
              disabled={!changeDetails}
              onChange={onChange}
            />
          </div>

          <div className="padding-top-3">
            <p>
              {changeDetails && "Se não tiver, por favor indicar indicativo"}
            </p>

            <TextField
              id="formDataPhone"
              label={t("text.phone")}
              variant="outlined"
              value={formDataPhone!}
              disabled={!changeDetails}
            />
          </div>
          <div className="padding-top-3">
            <TextField
              id="formDataEmail"
              label="E-mail"
              variant="outlined"
              value={formDataEmail!}
              disabled
              onChange={onChange}
            />
          </div>
        </div>
      </div>
      {user.account === "Commercial" && <div>Cenas</div>}
    </div>
  );
};

export default Profile;
