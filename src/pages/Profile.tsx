import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { getAuth, updateProfile } from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import FormDataProfile from "../interface/Profile";
import { toast } from "react-toastify";
import { updateName, updatePhone } from "../context/User/UserActions";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [changeDetails, setChangeDetails] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataProfile>({
    name: auth.currentUser?.displayName,
    email: auth.currentUser?.email,
    phone: auth.currentUser?.phoneNumber,
  });

  const { name, email, phone } = formData;

  const logout = () => {
    auth.signOut();
    navigate("/");
  };

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
                {changeDetails ? "Concluir alterações" : "Mudar Informações"}{" "}
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
    </div>
  );
};

export default Profile;
