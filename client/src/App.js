import React,{useEffect} from "react";
import AppRouter from "./Components/RouterComponent/RouterComponent";
import { useStateValue } from './data/StateProvider';
import { useCookies } from "react-cookie";


function App() {
  const [{ user }, dispatch] = useStateValue();

  const [cookies, setCookie, removeCookie] = useCookies(["userjwt"]);


  return (
    <div>
    
      <AppRouter user={ user }/>
    </div>
  );
}

export default App;
