import { UserActionType } from "../action-types/UserTypes";

interface GetUserAction {
  type: UserActionType.GET_USER;
  payload: [];
}

export type Action = GetUserAction;
