// Creating initial state for account
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

// Writing a basic reducer function for account
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    // Putting money into account
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };

    // Taking money out of the account
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    // Getting a loan
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    // Paying the loan
    case "account/payLoan":
      if (state.balance < state.loan) return state;
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    // Loading during currenct exchange
    case "account/convertingCurrency":
      return {
        ...state,
        isLoading: true,
      };

    // Default behavior (returning state, instead of throwing error in useReducer)
    default:
      return state;
  }
}

// Action creators for account reducer
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
export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}
export function payLoan() {
  return {
    type: "account/payLoan",
  };
}
