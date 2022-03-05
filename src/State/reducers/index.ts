import { combineReducers } from "redux";
import { userReducer } from "./UserReducer/UserReducer";

const reducers = combineReducers({
  user: userReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
