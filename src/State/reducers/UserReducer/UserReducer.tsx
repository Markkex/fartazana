import { UserActionType } from "../../action-types/UserTypes";
import { Action } from "../../actions/UserActions";

const initialState = {
  user: [],
};

const userReducer = (state: any = initialState, action: Action) => {
  switch (action.type) {
    case UserActionType.GET_USER:
      return {
        ...state,
        user: action.payload,
      };
  }
};

export default userReducer;
