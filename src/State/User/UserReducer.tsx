import { UserActionType } from "./UserActionTypes";
import { Action } from "./UserActions";
import UserState from "../../types/inteface";

const initialState: UserState = {
  user: [],
  language: "",
};

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case UserActionType.GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case UserActionType.GET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    default:
      return { ...state };
  }
};

export default userReducer;
