import React, { createContext, useReducer } from "react";
import userReducer from "./UserReducer";
import InitialState, {
  Action,
  InputProviderProps,
} from "../../interface/UserContext";

type AppState = typeof initialState;

const initialState: InitialState = {
  user: [],
};

const UserContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

const UserProvider = ({ children }: InputProviderProps) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
