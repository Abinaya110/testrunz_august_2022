import { useStateValue } from "../../../../data/StateProvider";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.min.css";
import Button from "@mui/material/Button";
import { actionTypes } from "../../../../data/reducer";
import { useCookies } from "react-cookie";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";

const Userprofile = () => {
  const [{ user }, dispatch] = useStateValue();
  const [editbt, setEditbt] = useState(false);
  const [yearerror, setYearerror] = useState();
  const [semestererror, setSemestererror] = useState();
  const [detail, setDetail] = useState({});
  const [update, setUpdate] = useState(false);
  const [cookies] = useCookies(["userjwt"]);

  useEffect(() => {
    // console.log("coookieee", cookies.userjwt);

    async function fetchuserData() {
      await axios
        .post(`${process.env.REACT_APP_API}/validateuser`, {
          usertoken: cookies.userjwt,
        })
        .then((res) => {
          dispatch({
            type: actionTypes.SET_USER,
            user: res.data.user,
          });
          setDetail(res.data.user);
          setCredit({
            ...credit,

            university: user.university,
            instituteName: user.instituteName,
            department: user.department,
            country: user.country,
            state: user.state,
            year: user.year,
            semester: user.semester,
            btnText: "Submit",
            _id: user._id,
          });
        });
    }

    fetchuserData();
  }, [update]);

  const [credit, setCredit] = useState({
    university: "",
    instituteName: "",
    department: "",
    country: "",
    state: "",
    year: "",
    semester: "",
    btnText: "Submit",
    _id: "",
  });

  const {
    university,
    instituteName,
    department,
    country,
    state,
    year,
    semester,
    btnText,
    _id,
  } = credit;

  const handleChange = (name) => (event) => {
    setCredit({ ...credit, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setYearerror();
    setSemestererror();
    if (parseInt(year) > 4 || parseInt(year) < 1) {
      setYearerror("Year must be from 1 to 4");
    } else if (parseInt(semester) > 8 || parseInt(semester) < 1) {
      setSemestererror("Semester must be from 1 to 8");
    } else {
      // console.log(
      //   "sumitted result",
      //   instituteName,
      //   department,
      //   country,
      //   state,
      //   year,
      //   semester,
      //   _id
      // );

      setCredit({ ...credit, btnText: "Submitting" });
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
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: actionTypes.SET_USER,
            user: data.updated,
          });
          setCredit({
            ...credit,
            university: user.university,
            instituteName: user.instituteName,
            department: user.department,
            country: user.country,
            state: user.state,
            year: user.year,
            semester: user.semester,
            btnText: "Submit",
          });
          setEditbt(!editbt);
          // console.log("noerror");
          setUpdate(!update);
        })
        .catch((error) => {
          // console.error("Error:", error);
        });
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          style={{ backgroundColor: "#F1C232", color: "black" }}
          onClick={() => setEditbt(!editbt)}
        >
          edit
        </Button>
      </div>
      <br />

      <hr />
      {editbt ? (
        <div>
          <form>
            {user.role === "superadmin" ? (
              <>
                <div className="form-group">
                  <label className="text-muted">University</label>
                  <input
                    onChange={handleChange("university")}
                    type="text"
                    className="form-control"
                    value={university}
                  />
                </div>
                <div className="form-group">
                  <label className="text-muted">Institute Name</label>
                  <input
                    onChange={handleChange("instituteName")}
                    type="text"
                    className="form-control"
                    value={instituteName}
                  />
                </div>
                <div className="form-group">
                  <label className="text-muted">Department</label>
                  <input
                    onChange={handleChange("department")}
                    type="text"
                    className="form-control"
                    value={department}
                  />
                </div>
              </>
            ) : null}
            <div className="form-group">
              <label className="text-muted">Country</label>
              <input
                onChange={handleChange("country")}
                type="text"
                className="form-control"
                value={country}
              />
            </div>
            <div className="form-group">
              <label className="text-muted">State</label>
              <input
                onChange={handleChange("state")}
                type="text"
                className="form-control"
                value={state}
              />
            </div>
            {user.role === "student" && (
              <>
                <div className="form-group">
                  <label className="text-muted">Year</label>
                  <input
                    onChange={handleChange("year")}
                    className="form-control"
                    value={year}
                    min="1"
                    max="4"
                    type="number"
                  />
                  <p className="errormsg">{yearerror}</p>
                </div>
                <div className="form-group">
                  <label className="text-muted">Semester</label>
                  <input
                    onChange={handleChange("semester")}
                    className="form-control"
                    value={semester}
                    min="1"
                    max="8"
                    type="number"
                  />
                  <p className="errormsg">{semestererror}</p>
                </div>
              </>
            )}
            <br />
            <div>
              <Button
                style={{ backgroundColor: "#F1C232", color: "black" }}
                onClick={clickSubmit}
              >
                {btnText}
              </Button>
              <br />
            </div>
          </form>
        </div>
      ) : (
        <div>
          <Card>
            <CardContent style={{ backgroundColor: "#E5E4E2" }}>
              <Grid container spacing={2} columns={16}>
                <Grid item xs={8}>
                  <span style={{ fontWeight: "bold" }}>Name:</span>
                  <br />
                  <span style={{ fontStyle: "italic", color: "gray" }}>
                    {detail.name ? detail.name : ""}
                  </span>
                </Grid>
                <Grid item xs={8}>
                  <span style={{ fontWeight: "bold" }}>Email:</span>
                  <br />
                  <span style={{ fontStyle: "italic", color: "gray" }}>
                    {detail.email ? detail.email : ""}
                  </span>
                </Grid>

                <Grid item xs={8}>
                  <span style={{ fontWeight: "bold" }}>University:</span>
                  <br />
                  <span style={{ fontStyle: "italic", color: "gray" }}>
                    {detail.university ? detail.university : "null"}
                  </span>
                </Grid>

                <Grid item xs={8}>
                  <span style={{ fontWeight: "bold" }}>Institute Name:</span>
                  <br />
                  <span style={{ fontStyle: "italic", color: "gray" }}>
                    {detail.instituteName ? detail.instituteName : ""}
                  </span>
                </Grid>

                <Grid item xs={8}>
                  <span style={{ fontWeight: "bold" }}>Department:</span>
                  <br />
                  <span style={{ fontStyle: "italic", color: "gray" }}>
                    {detail.department ? detail.department : ""}
                  </span>
                </Grid>
                <Grid item xs={8}>
                  <span style={{ fontWeight: "bold" }}>Role:</span>
                  <br />
                  <span style={{ fontStyle: "italic", color: "gray" }}>
                    {detail.role ? detail.role : ""}
                  </span>
                </Grid>

                <Grid item xs={8}>
                  <span style={{ fontWeight: "bold" }}>Country:</span>
                  <br />
                  <span style={{ fontStyle: "italic", color: "gray" }}>
                    {detail.country ? detail.country : ""}
                  </span>
                </Grid>
                <Grid item xs={8}>
                  <span style={{ fontWeight: "bold" }}>State:</span>
                  <br />
                  <span style={{ fontStyle: "italic", color: "gray" }}>
                    {detail.state ? detail.state : ""}
                  </span>
                </Grid>
                {user.role === "student" ? (
                  <>
                    {" "}
                    <Grid item xs={8}>
                      <span style={{ fontWeight: "bold" }}>Year:</span>
                      <br />
                      <span style={{ fontStyle: "italic", color: "gray" }}>
                        {detail.year ? detail.year : "null"}
                      </span>
                    </Grid>
                    <Grid item xs={8}>
                      <span style={{ fontWeight: "bold" }}>Semester:</span>
                      <br />
                      <span style={{ fontStyle: "italic", color: "gray" }}>
                        {detail.semester ? detail.semester : "null"}
                      </span>
                    </Grid>
                  </>
                ) : null}
              </Grid>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Userprofile;
