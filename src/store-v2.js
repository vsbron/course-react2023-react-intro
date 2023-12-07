// Importing the createStore function from redux
// It is deprecated, used for learning purposes only
import { combineReducers, createStore } from "redux";

// Creating initial state for account
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

// Creating initial state for customer
const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

// Writing a basic reducer function for account
function accountReducer(state = initialStateAccount, action) {
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

// Writing a basic reducer function for customer
function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    // Create customer
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };

    // Change customer's name
    case "customer/updateName":
      return { ...state, fullName: action.payload };

    // Default behavior (returning state, instead of throwing error in useReducer)
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// Creating the store
const store = createStore(rootReducer);

// Dispatching without the Action Creator function
// store.dispatch({ type: "account/deposit", payload: 500 });
// store.dispatch({ type: "account/withdraw", payload: 200 });
// store.dispatch({ type: "account/requestLoan", payload: { amount: 1000, purpose: "Buy a car"} });
// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

// Action creators for account reducer
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}
function payLoan() {
  return {
    type: "account/payLoan",
  };
}

// Action creators for customer reducer
function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}
function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}

// Dispatching with the account's Action Creator functions
store.dispatch(deposit(500));
store.dispatch(withdraw(200));
store.dispatch(requestLoan(1000, "Buy a Car"));
store.dispatch(payLoan());

// Dispatching with the customer's Action Creator functions
store.dispatch(createCustomer("BroN", 13));
store.dispatch(updateName("BBW"));

// Printing out the state object
console.log(store.getState());
