
import { Route, Redirect } from 'react-router-dom';

import React, { useState, useEffect ,useLayoutEffect} from "react";

import { useCookies } from "react-cookie";
import axios from "axios";
import { useStateValue } from '../data/StateProvider';
import Adminmsg from './Adminmsg';
import { actionTypes } from "../data/reducer"

const PersonalRoute = ({ auth, component: Component, ...rest }) => {
  const [{ user }, dispatch] = useStateValue();
  const [cookies, setCookie, removeCookie] = useCookies(["userjwt"]);
  const [userrole,setUserrole]=useState("")
  let  list=["admin","superadmin"]

  useEffect(()=>{
    const abortcont = new AbortController();
    console.log("coookieee",cookies.userjwt)

fetch(`${process.env.REACT_APP_API}/validateuser`, {
		method: "POST",
    // signal:abortcont.signal,
	  body: JSON.stringify({
      usertoken: cookies.userjwt
	}),
	headers: {
		"Content-type": "application/json; charset=UTF-8"
	}
})
.then(response => response.json())
.then(json => 
  {
 
    dispatch({
            type: actionTypes.SET_USER,
            user: json.user,
          });

  }
  );

   
  

  },[])
     return (
   <>
  
    <Route {...rest} render={props => ( user ? <Component {...props} /> :  
  
    null
    )} />   
    </>                      
)}


export default PersonalRoute