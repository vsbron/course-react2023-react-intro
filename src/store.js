// Importing the createStore function from redux
// It is deprecated, used for learning purposes only
import { applyMiddleware, combineReducers, createStore } from "redux";

// Importing the thunk library for using the middleware
import { thunk } from "redux-thunk";

// Importing reducers
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

// Combining reducers into root reducer
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// Creating the store from root reducer, and applying the Redux Thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

// Printing out hte state object
console.log(store.getState());

export default store;
