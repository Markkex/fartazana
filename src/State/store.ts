import { createStore } from "redux";
import reducers from "./CombinedReducers";

export const store = createStore(reducers);
