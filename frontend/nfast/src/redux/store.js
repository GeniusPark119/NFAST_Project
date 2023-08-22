import { createStore, compose, applyMiddleware } from "redux";
// eslint-disable-next-line import/no-extraneous-dependencies
import thunk from "redux-thunk/es";
import rootReducer from "./reducers/index";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* eslint no-underscore-dangle: 0 */
export const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk))
);

// export default store;
