import React from "react";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import { useParams} from "react-router-dom";

import ApiService from "../../Sevices/ApiService";
import ApiUrl from "../../ServerApi";
import DispBoard from "./DispBoard";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }
import Alert from '@mui/material/Alert';
const useStyles = makeStyles((theme) => ({
  root: {
    width: "80rem",
    
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

const DashBoard = (props) => {
  const classes = useStyles();
  const [data, setData] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState(null);
  const vertical ="top"
  const horizontal = "center"
  let {token} = useParams();


  React.useEffect(() => {
    ApiService.fetchUserById(token).then(
      (res) => {
        let user = res.data;
     
        data._id = user._id;
        data.studentName = user.studentName;
        data.runID = user.runID;
        data.labType = user.labType;
        data.experimentName = user.experimentName;
        setData({ ...data });
       
      }).catch((err)=>{
      console.log("content error",err)
      console.log("content error msg",err.data)
    })

    playingUser();
    changestatus()
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const goBack = () => {
    props.history.push("/runz");
  };

  const playingUser = () => {
    setMessage(
      `RunId ${token} experiment is encaged...`
    );
    setOpen(true);
  };

  const changestatus = () => {
    fetch(`${ApiUrl}/experiments/editstatus/${token}`, {
      method: "PATCH",
      // signal:abortcont.signal,
      body: JSON.stringify({
        status:"viewed",

    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => 
    {
    
      console.log("edit status",json)
      
    }
    );
  
  };

  return (
    <div className={classes.root}>
      {/* <button
        title="Exit"
        onClick={goBack}
        style={{
          border: "none",
          background: "none",
          zIndex: 100000,
          position: "absolute",
          top: 20,
          right: 20,
          color:"white"
        }}
      >
       Back<ArrowBackIosIcon/>
      </button> */}
        <ArrowBackIcon
        onClick={goBack}
        style={{
          color: "red",
          border: "1px solid black",
          borderRadius: "50%",
          background: "white",
          zIndex: 100000,
          position: "absolute",
          top: 10,
          right: 30,
        }}
      />

      <DispBoard data={data} />
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DashBoard;
