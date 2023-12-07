// Importing the function that will create the slice
import { createSlice } from "@reduxjs/toolkit";

// Creating initial state for account
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

// Creating the slice with reducers using createSlice function
const accountSlice = createSlice({
  name: "account", // Name of the slice
  initialState, // The initial state
  reducers: {
    // The reducers
    // Depositing money
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },

    // Withdrawing money
    withdraw(state, action) {
      state.balance -= action.payload;
    },

    // Requesting a loan
    requestLoan: {
      //  Preparing the new payload because it should have more than 1 argument
      prepare(amount, purpose) {
        // Returning the new payload
        return {
          payload: { amount, purpose },
        };
      },

      // Creating the reducer with the right amount of arguments
      reducer(state, action) {
        if (state.loan > 0) return; // Guard clause

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },

    // Paying the loan
    payLoan(state) {
      if (state.balance < state.loan) return state; // Guard clause

      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },

    // Converting currenct state
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

// Exporting the reducer from the slice
export default accountSlice.reducer;

// Exporting the action creators functions from the slice
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

// Action creators for deposit function
export function deposit(amount, currency) {
  // If currency is USD, just return the object for dispatch
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  // Otherwise return the function for middleware
  return async function (dispatch, getState) {
    // Setting the Loading state
    dispatch({ type: "account/convertingCurrency" });

    // API call
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;

    // Return action (new dispatch function call)
    dispatch({ type: "account/deposit", payload: converted });
  };
}
