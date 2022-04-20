import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";
import { getUser } from "../State/User/UserActionsCreators";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, TextField } from "@mui/material";

const SearchArea = () => {
  const auth = getAuth();

  const [area, setArea] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  const { t } = useTranslation();
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
      toast.error(t("messages.selectZone"));
    } else {
      navigate(`/explore/`);
    }
  };

  const onChange = (e: any) => {
    setArea(e.target.value);
  };

  return (
    <div className="search-area">
      <div className="bold-text area-text">
        <p>
          {t("text.hello")}
          {user?.name}
        </p>
      </div>
      <div className="bold-text area-text">{t("text.areaRequest")}</div>
      <div className="form-search-area">
        <TextField
          label={t("text.areaOfResidence")}
          value={area}
          onChange={onChange}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          onClick={onSubmit}
          className="padding-top-3"
        >
          {t("button.search")}
        </Button>
      </div>
    </div>
  );
};

export default SearchArea;
