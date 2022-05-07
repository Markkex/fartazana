import { RestaurantsActionType } from "./RestaurantsActionTypes";

interface RestaurantsAction {
  type: RestaurantsActionType.GET_RESTAURANTS;
  payload: [];
}

export type Action = RestaurantsAction;
