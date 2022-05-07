import { combineReducers } from "redux";
import userReducer from "./User/UserReducer";
import restaurantReducer from "./Restaurants/RestaurantsReducer";

const reducers = combineReducers({
  user: userReducer,
  restaurants: restaurantReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
