// Creating initial state for account
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

// Writing a basic reducer function for account
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    // Putting money into account
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };

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

    // Default behavior (returning state, instead of throwing error in useReducer)
    default:
      return state;
  }
}

// Action creators for account reducer
export function deposit(amount) {
  return { type: "account/deposit", payload: amount };
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
