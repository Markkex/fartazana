import { UserActionType } from "./UserActionTypes";
import { Action } from "./UserActions";
import { UserState } from "../../types/inteface";

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
    default:
      return { ...state };
  }
};

export default userReducer;
