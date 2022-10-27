import React from "react";
import AppRouter from "./Components/RouterComponent/RouterComponent";
import { useStateValue } from "./data/StateProvider";

function App() {
  const [{ user }] = useStateValue();

  return (
    <div>
      <AppRouter user={user} />
    </div>
  );
}

export default App;
