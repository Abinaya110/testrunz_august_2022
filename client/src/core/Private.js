import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { actionTypes } from "../data/reducer";
import CardContent from "@material-ui/core/CardContent";
import { useStateValue } from "../data/StateProvider";
import ApiUrl from "../ServerApi";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: "100px",
  },
});

const Private = (props) => {
  const [_id, set_id] = useState("");
  const [universityerror, setUniversityerror] = useState();
  const [institutenameerror, setInstitutenameerror] = useState();
  const [departmenterror, setDepartmenterror] = useState();
  const [countryerror, setCountryerror] = useState();
  const [stateerror, setStateerror] = useState();
  const [yearerror, setYearerror] = useState();
  const [semestererror, setSemestererror] = useState();

  const [role, setRole] = useState("");
  const [university, setUniversity] = useState();
  const [instituteName, setInstituteName] = useState("");
  const [department, setDepartment] = useState("");
  const [universitytemp, setUniversitytemp] = useState();
  const [instituteNametemp, setInstituteNametemp] = useState("");
  const [departmenttemp, setDepartmenttemp] = useState("");

  const [universitylist, setUniversitylist] = useState();
  const [institutelist, setInstitutelist] = useState();
  const [departmentlist, setDepartmentlist] = useState();

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [showOnce, setShowOnce] = useState(false);
  const [btnText, setBtnText] = useState("Submit");
  const [{ user }, dispatch] = useStateValue();
  const classes = useStyles();

  useEffect(() => {
    set_id(user._id);
    console.log("private", user);
    if (user.university) {
      setUniversitytemp(user.university);
      fetchdepartment(user.university);
    }
    if (user.instituteName) {
      setInstituteNametemp(user.instituteName);
      fetchdepartment(user.instituteName);
    }
    if (user.department) {
      setDepartmenttemp(user.department);
    }
    if (user.role) {
      setRole(user.role);
    }
    if (user.showOnce === true) {
      props.history.push("/app");
    }
    fetch(`${ApiUrl}/moreInfo/all/university`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUniversitylist(data.ids);
      });
  }, []);

  // getinstitute
  const fetchinstitute = (university) => {
    setUniversity(university);
    setInstituteName("");
    setDepartment("");

    fetch(`${ApiUrl}/moreInfo/respectiveinstitute`, {
      method: "POST",

      body: JSON.stringify({
        university: university,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setInstitutelist(json.ids);
        console.log(json);
      });
  };

  // get department
  const fetchdepartment = (institute) => {
    setInstituteName(institute);
    setDepartment();

    fetch(`${ApiUrl}/moreInfo/department`, {
      method: "POST",

      body: JSON.stringify({
        institute: institute,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setDepartmentlist(json.ids);

        console.log(json);
      });
  };

  const clickSubmit = (event) => {
    event.preventDefault();

    setUniversityerror();
    setInstitutenameerror();
    setDepartmenterror();
    setCountryerror();
    setStateerror();
    setYearerror();
    setSemestererror();

    setUniversity(university || universitytemp);
    setInstituteName(instituteName || instituteNametemp);
    setDepartment(department || departmenttemp);
    console.log("check here", department);

    if (!university) {
      console.log("no university name");
      setUniversityerror("*University required*");
    } else if (!instituteName) {
      console.log("no institute name");
      setInstitutenameerror("*Institute Name required*");
    } else if (!department) {
      console.log("no department name");
      setDepartmenterror("*Department required*");
    } else if (!country) {
      console.log("no country name");
      setCountryerror("*Country required*");
    } else if (state === "" || null) {
      console.log("no password");
      setStateerror("*State required*");
    } else if (role === "student" && (year === "" || null)) {
      console.log("no year");
      setYearerror("*Year required  enter a valid number*");
    } else if (
      (role === "student" && parseInt(year) > 4) ||
      parseInt(year) < 1
    ) {
      setYearerror("Year must be from 1 to 4");
    } else if (role === "student" && (semester === "" || null)) {
      console.log("no semester");
      setSemestererror("*Semester required enter a valid number*");
    } else if (
      (role === "student" && parseInt(semester) > 8) ||
      parseInt(semester) < 1
    ) {
      setSemestererror("Semester must be from 1 to 8");
    } else {
      setBtnText("Submitting");

      fetch(`${process.env.REACT_APP_API}/users/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          university,
          instituteName,
          department,
          country,
          state,
          year,
          semester,
          _id,
          showOnce: true,
        }),
      })
        .then((response) => {
          fetch(`${process.env.REACT_APP_API}/users/${user._id}`)
            .then((res) => res.json())
            .then((json) => {
              dispatch({
                type: actionTypes.SET_USER,
                user: json,
              });
              toast.success("Profile updated successful");
              props.history.push("/app");
            });
        })
        .catch((error) => {
          console.log("Sign-up error", error);
          setBtnText("Submit");
          toast.error("error.response.data.error");
        });
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent style={{ alignItems: "center" }}>
        <div>
          <ToastContainer />
          {showOnce && props.history.push("/app")}

          {showOnce === false && (
            <>
              <p className="lead text-center">Profile Update</p>
              <form>
                {!universitytemp ? (
                  <>
                    {universitylist && (
                      <div className="form-group">
                        <label className="text-muted">University</label>
                        <br /> <br />
                        <Autocomplete
                          style={{ width: "100%" }}
                          id="outlined-basic"
                          variant="outlined"
                          size="small"
                          value={university}
                          onChange={(event, newValue) => {
                            fetchinstitute(newValue);
                          }}
                          options={universitylist.map((option) => option)}
                          sx={{ width: 300 }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </div>
                    )}
                    <p className="errormsg">{universityerror}</p>
                  </>
                ) : (
                  <>
                    <label className="text-muted">
                      University : {universitytemp}
                    </label>
                    <br />
                  </>
                )}

                {!instituteNametemp ? (
                  <>
                    {institutelist && (
                      <div className="form-group">
                        <label className="text-muted">Institute Name</label>
                        <br /> <br />
                        <Autocomplete
                          style={{ width: "100%" }}
                          id="outlined-basic"
                          variant="outlined"
                          size="small"
                          value={instituteName}
                          onChange={(event, newValue) => {
                            fetchdepartment(newValue);
                            setDepartment();
                          }}
                          options={institutelist.map((option) => option)}
                          sx={{ width: 300 }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </div>
                    )}
                    <p className="errormsg">{institutenameerror}</p>
                  </>
                ) : (
                  <>
                    <label className="text-muted">
                      Institute Name : {instituteNametemp}
                    </label>
                    <br />
                  </>
                )}

                {!departmenttemp ? (
                  <>
                    {departmentlist && (
                      <div className="form-group">
                        <label className="text-muted">Department</label>
                        <br /> <br />
                        <Autocomplete
                          style={{ width: "100%" }}
                          value={department}
                          size="small"
                          onChange={(event, newValue) => {
                            setDepartment(newValue);
                          }}
                          options={departmentlist.map((option) => option)}
                          id="controllable-states-demo"
                          sx={{ width: 300 }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </div>
                    )}
                    <p className="errormsg">{departmenterror}</p>
                  </>
                ) : (
                  <>
                    <label className="text-muted">
                      Department :{departmenttemp}
                    </label>
                  </>
                )}

                <div className="form-group">
                  <label className="text-muted">Country</label>
                  <input
                    onChange={(e) => setCountry(e.target.value)}
                    type="text"
                    className="form-control"
                    value={country}
                  />
                </div>
                <p className="errormsg">{countryerror}</p>

                <div className="form-group">
                  <label className="text-muted">State</label>
                  <input
                    onChange={(e) => setState(e.target.value)}
                    type="text"
                    className="form-control"
                    value={state}
                  />
                </div>
                <p className="errormsg">{stateerror}</p>
{console.log(role)}
                {role === "student" && (
                  <>
                    <div className="form-group">
                      <label className="text-muted">Year</label>
                      <input
                        onChange={(e) => setYear(e.target.value)}
                        className="form-control"
                        value={year}
                        type="number"
                        min="1"
                        max="4"
                      />
                    </div>

                    <p className="errormsg">{yearerror}</p>
                    <div className="form-group">
                      <label className="text-muted">Semester</label>
                      <input
                        onChange={(e) => setSemester(e.target.value)}
                        className="form-control"
                        value={semester}
                        type="number"
                        min="1"
                        max="8"
                      />
                    </div>
                    <p className="errormsg">{semestererror}</p>
                  </>
                )}
                <br />
                <div style={{ alignItems: "center" }}>
                  <button className="btn btn-primary" onClick={clickSubmit}>
                    {btnText}
                  </button>
                  <br />
                </div>
              </form>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Private;
