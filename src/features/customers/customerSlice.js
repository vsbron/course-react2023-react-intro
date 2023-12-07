// Importing the function that will create the slice
import { createSlice } from "@reduxjs/toolkit";

// Creating initial state for customer
const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

// Creating the slice with reducers using createSlice function
const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    // Creating the customer
    createCustomer: {
      //  Preparing the new payload because it should have more than 1 argument
      prepare(fullName, nationalID) {
        // Returning the new payload
        return {
          payload: {
            fullName,
            nationalID,
            createdAt: new Date().toISOString(),
          },
        };
      },

      // Creating the reducer with the right amount of arguments
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = action.payload.createdAt;
      },
    },

    // Updating the customer's name
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

// Exporting the reducer from the slice
export default customerSlice.reducer;

// Exporting the action creators functions from the slice
export const { createCustomer, updateName } = customerSlice.actions;
