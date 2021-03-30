import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";

/*Nextjs redux wrapper import */
import { createWrapper } from "next-redux-wrapper";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const middlewares = [thunk];

// const composeEnhancers =
//   (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__<any>({}) : compose;
// ENZYME COURSE MIDDLEWARES EDIT to export to testUtil.tsx


// const store = createStore(
//   rootReducer,
//   compose(applyMiddleware(thunk))
// );

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

const makeStore = () => createStore(rootReducer, enhancer)
// const makeStore = () =>
//   createStore(rootReducer, compose(applyMiddleware(...middlewares)));

export const wrapper = createWrapper(makeStore);

// export default store;
