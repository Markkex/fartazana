import { UserActionType } from "./UserActionTypes";

interface GetUserAction {
  type: UserActionType.GET_USER;
  payload: [];
}

interface GetUserLanguage {
  type: UserActionType.GET_LANGUAGE;
  payload: string;
}

interface SetUserLocation {
  type: UserActionType.SET_LOCATION;
  payload: string;
}

export type Action = GetUserAction | GetUserLanguage | SetUserLocation;
