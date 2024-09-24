// /redux/store.js
import { createStore, applyMiddleware, compose } from "redux";
import { cartReducer } from "./reducers/cartReducer";
import { combineReducers } from "redux";
import { thunk } from "redux-thunk"; // Import redux-thunk middleware

const rootReducer = combineReducers({
  cart: cartReducer,
});

// Use compose to combine Redux DevTools and middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)) // Apply the thunk middleware
);

export default store;
