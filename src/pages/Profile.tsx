import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { getAuth, updateProfile } from "firebase/auth";

import { useNavigate } from "react-router-dom";
import FormDataProfile from "../interface/Profile";
import { toast } from "react-toastify";
import {
  getUser,
  updateName,
  updatePhone,
} from "../State/action-creators/user/UserActions";
import { useContext } from "react";
import { UserContext } from "../State/User/UserContext";
import { useEffect } from "react";
import Spinner from "../components/Spinner";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [changeDetails, setChangeDetails] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataProfile>({
    name: auth.currentUser?.displayName,
    email: auth.currentUser?.email,
    phone: auth.currentUser?.phoneNumber,
  });

  const { name, email, phone } = formData;

  useEffect(() => {
    const getUserCredentials = async () => {
      const getUserData = await getUser();
      dispatch({ type: "GET_USER", payload: getUserData });
    };
    getUserCredentials();
    setLoading(false);
    console.log(state.user);
  }, [auth]);

  const logout = () => {
    auth.signOut();
    navigate("/");
  };

  if (loading === true) {
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
      if (auth.currentUser?.displayName !== name) {
        updateName(name);
      }
      if (auth.currentUser?.phoneNumber !== phone) {
        updatePhone(phone);
      }
      toast.success("Atualização de dados bem sucedida");
    } catch (error) {
      toast.error(`${error}`);
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div id="recaptcha-container"></div>
      <header>
        <h1 className="txt-align-center padding-top-3">Detalhes Pessoais</h1>
      </header>
      <div className="container">
        <div>
          <div className="options--profile">
            <div>
              <p
                className="change-details"
                onClick={() => {
                  changeDetails && onSubmit();
                  setChangeDetails((prevState) => !prevState);
                }}
              >
                {changeDetails ? "Concluir alterações" : "Mudar Informações"}
              </p>
            </div>
            <div className="logout">
              <button onClick={logout} className="button--logout">
                Logout
              </button>
            </div>
          </div>
          <div className="card margin-top-3 padding-2">
            <div className="padding-top-3">
              <p>
                <label htmlFor="name">Nome</label>
              </p>
              <input
                className={!changeDetails ? "input" : "input-disabled"}
                disabled={!changeDetails}
                value={name!}
                id="name"
                onChange={onChange}
              />
            </div>

            <div className="padding-top-1">
              <p>
                <label htmlFor="phone">Telemóvel</label>
              </p>
              <p>
                {changeDetails && "Se não tiver, por favor indicar indicativo"}
              </p>

              <input
                disabled={!changeDetails}
                value={phone!}
                id="phone"
                onChange={onChange}
              />
            </div>
            <div className="padding-top-1">
              <p>
                <label htmlFor="email">E-mail</label>
              </p>
              <input value={email!} disabled />
            </div>
          </div>
        </div>
      </div>
      {loading === false && state.user?.account === "Commerce" && (
        <div>cenas</div>
      )}
    </div>
  );
};

export default Profile;
