import { RestaurantsActionType } from "./RestaurantsActionTypes";
import { Action } from "./RestaurantsActions";
import ReduxState from "../../types/inteface";

const initialState: ReduxState = {
  restaurants: undefined,
};

const restaurantsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case RestaurantsActionType.GET_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload,
      };
    default:
      return { ...state };
  }
};

export default restaurantsReducer;
