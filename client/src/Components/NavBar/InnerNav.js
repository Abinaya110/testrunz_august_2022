import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@mui/material/Typography";
import "./Navbar.css";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

const InnerNav = () => {
  const history = useHistory();
  // const [{ user }, dispatch] = useStateValue();
  const [cookies, setCookie, removeCookie] = useCookies(["userjwt"]);
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // useEffect
  // useEffect(()=>{

  //   async function fetchuserData() {

  //     await axios
  //       .post(`${process.env.REACT_APP_API}/validateuser`, {
  //         usertoken: cookies.userjwt
  //       })
  //       .then((res) => {

  //         dispatch({
  //           type: actionTypes.SET_USER,
  //           user: res.data.user
  //        });
  //        });
  //   }

  //   fetchuserData();

  // },[])

  const runz = () => {
    history.push("/app");
  };
  const logout = () => {
    window.localStorage.clear();
    removeCookie("userjwt");
    // setAnchorEl(null);
    return (window.location.href = "/");
  };
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  // const profile = () => {
  //   history.push("/profile");
  // };

  return (
    <div>
      <Toolbar>
        <Typography onClick={runz} sx={{ flexGrow: 1 }}>
          {" "}
          <span>Test</span>
          <span style={{ backgroundColor: "#F1C232" }}>RunZ</span>
        </Typography>
        {/* <Avatar  size="small"  style={{backgroundColor:"#F1C232",marginRight:"70px",color:"black"}} className={classes.logout} onClick={handleClick}>
                    {`${user.name}`.substring(0, 2)}
</Avatar> */}
        <Typography
          onClick={logout}
          component="button"
          style={{
            backgroundColor: "#F1C232",
            marginRight: "70px",
            padding: "5px",
            borderRadius: "5px",
            borderWidth: "0.5px",
            borderColor: "gray",
          }}
        >
          Logout
        </Typography>

        {/* <button className={classes.logout} style={{color:"white"}} onClick={handleClick}>hello</button> */}
        {/* <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={profile}>Profile</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu> */}
      </Toolbar>
    </div>
  );
};

export default InnerNav;
