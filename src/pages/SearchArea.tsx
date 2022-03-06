import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";

import fartazanaLogo from "../assets/jpg/Fartazana-logo.png";
import { getUser } from "../State/User/UserActionsCreators";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserState } from "../State/User/UserReducer";
const SearchArea = () => {
  const auth = getAuth();

  const [area, setArea] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: UserState) => state.user);

  useEffect(() => {
    const getUserCredentials = async () => {
      const userData = await getUser();
      dispatch({ type: "GET_USER", payload: userData });
    };
    getUserCredentials();
  }, [auth]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (area === "") {
      toast.error("Precisa de escolher uma zona.");
    } else {
      navigate(`/explore/${area}`);
    }
  };

  const onChange = (e: any) => {
    setArea(e.target.value);
  };

  return (
    <div className="search-area">
      <div className="logo">
        <img src={fartazanaLogo} className="logo--settings" />
      </div>
      <div className="bold-text area-text">
        Olá {auth.currentUser?.displayName}!
      </div>
      <div className="bold-text area-text">Vamos pedir em que zona?</div>
      <div className="form-search-area">
        <form onSubmit={onSubmit}>
          <input
            placeholder="Escolha a sua área de residência"
            className="input-text padding-3"
            value={area}
            onChange={onChange}
            autoComplete="true"
          />
          <button type="submit">Procurar</button>
        </form>
      </div>
    </div>
  );
};

export default SearchArea;
