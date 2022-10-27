import { Route } from "react-router-dom";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useStateValue } from "../data/StateProvider";
import { actionTypes } from "../data/reducer";

const PrivateRoute = ({ auth, component: Component, ...rest }) => {
  const [{ user }, dispatch] = useStateValue();
  const [cookies] = useCookies(["userjwt"]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/validateuser`, {
      method: "POST",

      body: JSON.stringify({
        usertoken: cookies.userjwt,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        window.localStorage.setItem("userlog", json.user);
        dispatch({
          type: actionTypes.SET_USER,
          user: json.user,
        });
      });
  }, [cookies.userjwt, dispatch]);
  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          user ? (
            <Component {...props} />
          ) : // <Redirect to="/signin" />
          null
        }
      />
    </>
  );
};

export default PrivateRoute;
