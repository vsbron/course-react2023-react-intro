// Importing the configureStore function from reduxJS toolkit
import { configureStore } from "@reduxjs/toolkit";

// Importing reducers
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

// Creating the store using RTK with thunk middleware created automatically
const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

// Printing out the state object
console.log(store.getState());

export default store;
