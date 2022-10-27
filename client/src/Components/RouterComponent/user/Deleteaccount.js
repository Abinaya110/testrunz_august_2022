import React, { useState } from "react";
import { auth } from "../../../authent/firebase";
import { useStateValue } from "../../../data/StateProvider";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

const Deleteaccount = () => {
  const [{ user }] = useStateValue();
  const history = useHistory();
  const [show, setShow] = useState(false);

  const deletedata = () => {
    // const userdet = auth.currentUser;

    // console.log(userdet);
    fetch(`${process.env.REACT_APP_API}/deleteuser`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        userid: user._id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Success:Datas deleted", data);
        alert("Datas has been deleted Successuly");
        setShow(true);
      })
    //   .catch((error) => {
    //      console.log("error:datas deleted");
    //      console.error("Error:", error);
    //   });
  };
  const deleteuser = () => {
    auth.currentUser
      .delete()
      .then(() => {
        alert("Success:user has been deleted");
        window.localStorage.clear();
        history.push("/");
      })
      .catch((error) => {
        // console.log("Error: User has deleted", error);
        alert("Success: User has not been deleted signin again");
      });
  };

  return (
    <div>
      <div style={{ marginBottom: "50px" }}>
        <Button onClick={deletedata} variant="contained">
          Delete All Data{" "}
        </Button>
      </div>
      <br />

      <div style={{ display: show ? "block" : "none" }}>
        <Button onClick={deleteuser} variant="contained">
          Delete user{" "}
        </Button>
      </div>
    </div>
  );
};

export default Deleteaccount;
