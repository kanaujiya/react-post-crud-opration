import React, { createContext } from "react";
import HomePage from "./component/HomePage";
const UserDetails = createContext();

function App() {
  return (
    <div className="App">
      <HomePage />
    </div>
  );
}

export default App;
export { UserDetails };
