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

const Profile: FC = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
                value={formDataName!}
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
                value={formDataPhone!}
                id="phone"
                onChange={onChange}
              />
            </div>
            <div className="padding-top-1">
              <p>
                <label htmlFor="email">E-mail</label>
              </p>
              <input value={formDataEmail!} disabled />
            </div>
          </div>
        </div>
      </div>
      {user.account === "Commercial" && <div>Cenas</div>}
    </div>
  );
};

export default Profile;
