import { combineReducers } from "redux";
import userReducer from "./User/UserReducer";

const reducers = combineReducers({
  user: userReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;