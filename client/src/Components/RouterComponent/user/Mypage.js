import React, { useEffect, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import ApiService from "../../../Sevices/ApiService";
import { useStateValue } from "../../../data/StateProvider";
import MaterialTable from "material-table";
import Loading from "./Lodaing";
import { useHistory } from "react-router-dom";
import Notificationmypage from "./Notificationmypage";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// const style = {
//   marginTop: "55px",
//   display: "flex",
//   justifyContent: "center",
// };

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    maxWidth: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     width: "50%",
//     height: "55%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//     borderRadius: "2%",
//   },
// };

// const customStylesshare = {
//   content: {
//     top: "50%",
//     left: "50%",
//     width: "30%",
//     height: "35%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//     borderRadius: "2%",
//   },
// };

// const customStylescell = {
//   content: {
//     color: "red",
//     backgroundColor: "black",
//   },
// };
// const fetchuser = async () => {
//   let ress = await ApiService.fetchUsers();
//   return ress;
// };

const Mypage = () => {
  let rows = [];
  const [{ user }] = useStateValue();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = useState([]);
  const [loadingscreen, setLoadingscreen] = useState(true);
  const [message, setMessage] = useState(null);
  const columns1 = [
    { title: "S.NO", field: "id" },
    { title: "Procedure Name", field: "ProcedureName" },
    // { title: "Template Id", field: "TemplateId" },
    // { title: "Experiment Name", field: "ExperimentName" },
    { title: "Lab Name", field: "labname" },
    //  { title: "Procedure ID    ", field: "ProcedureId",width:"18%" ,sorting:false },
    { title: "Status", field: "status" },
    { title: "Submitted By", field: "studentName" },
    { title: "Submitted Time", field: "sharedDates" },
  ];

  let history = useHistory();

  useEffect(() => {
    value();

    if (user.showOnce === false) {
      history.push("/private");
      // console.log("truee", user.showOnce);
    }
  }, [message]);

  const value = async () => {
    let userId = {
      _id: user.email,
      // _id:"mugilan.learny@gmail.com"
    };
    const usersdum = await ApiService.fetchUsersmail(userId).then((res) => res);
    // console.log("asdsaddsadafdwfsfas", usersdum);
    setLoadingscreen(false);
    setUsers(() => usersdum.data.data);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const deleteUser = async (data) => {
    // console.log("this isFinite", data.email)

    let toremove = {
      email: user.email,
      _id: data.ProcedureId,
    };

    ApiService.removeshareduser(toremove).then((res) => {
      setMessage("Deleted Successfully");
    });
  };

  const playUser = (id) => {
    // window.localStorage.removeItem("sharedId");
    // window.localStorage.setItem("sharedId", id);
    history.push(`/shareddash/${id}`);
    // console.log("runid mypage", id)
  };
  // let individuals = users.filter(function (userr) {return userr.shareWith.includes(user.email);}).reverse();
  let individuals = users;
  individuals.map((userr, ident) => {
    return rows.push({
      id: ident + 1,
      labname: userr.labType,
      ProcedureName: userr.experimentName,
      // TemplateId: userr.runID.slice(userr.runID.length - 12),
      // ExperimentName: userr.experimentName,
      studentName: userr.studentName,
      ProcedureId: userr._id,
      sharedDates: new Date(userr.sharedDate).toDateString(),
      status: userr.status,
    });
  });

  return (
    <div className={classes.root}>
      <div>
        {loadingscreen ? (
          <Loading />
        ) : (
          <div>
            {users.length !== 0 && (
              <div
                style={{ position: "relative", left: "50px", width: "500px" }}
              >
                <Notificationmypage users={users} />
              </div>
            )}

            <MaterialTable
              columns={columns1}
              data={rows}
              title="Submitted"
              onRowClick={(e, data) => playUser(data.ProcedureId)}
              options={{
                actionsColumnIndex: -1,
                grouping: true,
                pageSizeOptions: [5, 10],
                pageSize: 10,
                headerStyle: {
                  zIndex: 0,
                },
                tableLayout: "auto",
              }}
              localization={{
                pagination: { labelRowsSelect: "Runz" },
                body: {
                  editRow: {
                    deleteText: `Are you sure you want to delete this experiment?`,
                  },
                },
              }}
              editable={{
                onRowDelete: (data) =>
                  new Promise((resolve, reject) => {
                    deleteUser(data);

                    setTimeout(() => resolve(), 500);
                  }),
              }}
            />
          </div>
        )}
      </div>
      {/* <Paper elevation={1} >hello</Paper> */}

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Mypage;
