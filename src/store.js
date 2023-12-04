// Importing the createStore function from redux
// It is deprecated, used for learning purposes only
import { combineReducers, createStore } from "redux";

// Importing reducers
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

// Combining reducers into root reducer
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// Creating the store from root reducer
const store = createStore(rootReducer);

// Printing out hte state object
console.log(store.getState());

export default store;
