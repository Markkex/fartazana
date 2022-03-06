import { UserActionType } from "./UserActionTypes";
import { Action } from "./UserActions";

interface User {
  account: string;
  name: string;
  email: string;
  phone: string;
}

export interface UserState {
  user: User[];
}

const initialState = {
  user: [],
};

const userReducer = (state: UserState = initialState, action: Action) => {
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
