import { useState } from "react"; // useState hook
import { useDispatch } from "react-redux"; // Hook to get a dispatch from Redux store
import { createCustomer } from "./customerSlice"; // Action creator function

function Customer() {
  // Setting the state for name and ID
  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");

  // Getting the dispatch function for our Redux store
  const dispatch = useDispatch();

  function handleClick() {
    // Guard clause
    if (!fullName || !nationalId) return;

    // Dispatching the action creators function
    dispatch(createCustomer(fullName, nationalId));
  }

  return (
    <div>
      <h2>Create new customer</h2>
      <div className="inputs">
        <div>
          <label>Customer full name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label>National ID</label>
          <input
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
          />
        </div>
        <button onClick={handleClick}>Create new customer</button>
      </div>
    </div>
  );
}

export default Customer;
