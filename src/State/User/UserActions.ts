import { UserActionType } from "./UserActionTypes";

interface GetUserAction {
  type: UserActionType.GET_USER;
  payload: [];
}

export type Action = GetUserAction;
