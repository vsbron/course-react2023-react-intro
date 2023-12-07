// Creating initial state for customer
const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

// Writing a basic reducer function for customer
export default function customerReducer(state = initialStateCustomer, action) {
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

// Action creators for customer reducer
export function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}
export function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}
