import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";

//import firebase from "../firebase";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// const composeEnhancers =
//   (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// ENZYME COURSE MIDDLEWARES EDIT to export to testUtil.tsx
export const middlewares = [thunk];

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk))
);

export default store;
