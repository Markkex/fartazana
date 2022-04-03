import { UserActionType } from "./UserActionTypes";

interface GetUserAction {
  type: UserActionType.GET_USER;
  payload: [];
}

interface GetUserLanguage {
  type: UserActionType.GET_LANGUAGE;
  payload: string;
}

export type Action = GetUserAction | GetUserLanguage;
