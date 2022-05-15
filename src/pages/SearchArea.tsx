import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";
import { getUser } from "../State/User/UserActionsCreators";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, InputLabel, MenuItem, Select } from "@mui/material";
import { getRestaurants } from "../State/Restaurants/RestaurantsActionCreators";
import Spinner from "../components/Spinner";

const SearchArea = () => {
  const auth = getAuth();
  let locations: any[] = [];
  let filteredArray: any[] = [];
  let objectArray: any[] = [];

  const [loading, setLoading] = useState(false);
  const user = useSelector((state: any) => state.user.user);
  const restaurants = useSelector(
    (state: any) => state.restaurants.restaurants
  );
  const [area, setArea] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    setLoading(true);
    const getUserCredentials = async () => {
      const userData = await getUser();
      dispatch({ type: "GET_USER", payload: userData });
    };

    getUserCredentials();
  }, [auth, dispatch]);

  useEffect(() => {
    const loadRestaurants = async () => {
      const restaurantsData = await getRestaurants();
      dispatch({ type: "GET_RESTAURANTS", payload: restaurantsData });
    };
    loadRestaurants();
    setLoading(false);
  }, [dispatch, user]);

  if (loading) {
    <Spinner />;
  }

  restaurants?.map((restaurant: any) => {
    filteredArray.push(restaurant.location);
  });

  objectArray = filteredArray.filter(function (item: any, pos: any) {
    return filteredArray.indexOf(item) == pos;
  });

  locations = Object.assign(objectArray?.map((k: any) => ({ location: k })));

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
        <InputLabel id="demo-simple-select-label">
          {t("text.areaOfResidence")}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          label="Area"
          onChange={onChange}
          value={area}
          className="input"
        >
          {locations?.map((location: any) => (
            <MenuItem key={location.location} value={location.location}>
              {location.location}
            </MenuItem>
          ))}
        </Select>
        <div className="margin-top-2">
          <Button type="submit" variant="contained" onClick={onSubmit}>
            {t("button.search")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchArea;
