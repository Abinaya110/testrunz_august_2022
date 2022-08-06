import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { auth } from "../../../../authent/firebase";
import axios from "axios";
import Swal from "sweetalert2";
import ApiUrl from "../../../../ServerApi";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

function Addusersuperadmin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [university, setUniversity] = useState("");
  const [institute, setInstitute] = useState("");
  const [department, setDepartment] = useState("");

  const [emailerror, setEmailerror] = useState();
  const [nameerror, setNameerror] = useState();
  const [roleerror, setRoleerror] = useState("");
  const [universityerror, setUniversityerror] = useState("");
  const [instituteerror, setInstituteerror] = useState("");
  const [departmenterror, setDepartmenterror] = useState("");
  const [laberror, setLaberror] = useState("");


  const [universitylist, setUniversitylist] = useState();
  const [institutelist, setInstitutelist] = useState();
  const [departmentlist, setDepartmentlist] = useState();

  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState();
  const [right, setRight] = React.useState([]);
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetch(`${ApiUrl}/moreInfo/all/university`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUniversitylist(data.ids);
      });

    function randomStr(len) {
      var arr =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var ans = "";
      for (var i = len; i > 0; i--) {
        ans += arr[Math.floor(Math.random() * arr.length)];
      }
      return ans;
    }
    setPassword(randomStr(8));
  }, []);

  // getinstitute
  const fetchinstitute = (university) => {
    setUniversity(university);
    setInstitute("");
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
    setInstitute(institute);
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

  const fetchlab = (department) => {
    console.log("heheheeh", department);
    setDepartment(department);
    setRight([]);
    setLeft();
    fetch(`${ApiUrl}/moreInfo/labs`, {
      method: "POST",

      body: JSON.stringify({
        department: department,
        instituteName:institute
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setLeft(json.ids);
        console.log(json);
      });
  };

  const createuser = (e) => {
    e.preventDefault();
    setNameerror();
    setEmailerror();
    setRoleerror();
    setUniversityerror();
    setInstituteerror();
    setDepartmenterror();
    setLaberror();
    console.log(name);
    console.log(email);
    console.log(role);
    console.log("right", right);
    console.log(institute);
    console.log(department);
    console.log("This is password", password);

    if (!name) {
      setNameerror("*Name required*");
    } else if (!email) {
      setEmailerror("*Email required*");
    } else if (!role) {
      setRoleerror("*Role required*");
    } else if (!university) {
      setUniversityerror("*University required*");
    } else if (!institute) {
      setInstituteerror("*Institute required*");
    } else if (!department) {
      setDepartmenterror("*Department required*");
    } else if (!right.length) {
      setLaberror("*Lab required*");
    } else {
      let usermail = {
        name: name,
        email: email,
        password: password,
      };
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          console.log("successfully Registered", userCredential);

          fetch(`${process.env.REACT_APP_API}/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              name: name,
              role: role,
              labtype: right,
              instituteName: institute,
              department: department,
              university: university,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              Swal.fire(
                "User Created",
                "User has been Created successfully",
                "success"
              );
              /// send email
              axios
                .post(process.env.REACT_APP_API + "/usermail", usermail)
                .then((res) => {
                  console.log(res.data);
                  if (res.data == "error") {
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "Created with invalid email",
                    });
                  } else {
                    console.log("mail sent successfully.");

                    Swal.fire(
                      "User Created",
                      "User has been Created and password is sent through mail",
                      "success"
                    );
                  }
                });
              //////////////
              setEmail();
              setName();
              setRole();
              setUniversity();
              setInstitute();
              setDepartment();
              setRight();
              // setLab()
            })
            .catch((error) => {
              console.error("Error:", error);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "User not registered contact testrunz developer",
              });
            });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("Failure1", errorMessage);
          console.log("Failure2", errorCode);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Authentication failed",
          });
        });
    }
  };

  return (
    <div>
      <div>
        <label> Name :&nbsp;&nbsp; </label>
        <TextField
          id="outlined-size-small"
          size="small"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (
              /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~1234567890]/.test(
                e.target.value
              )
            ) {
              setNameerror("*No Special Character Allowed*");
            } else {
              setNameerror();
            }
          }}
        />
        <p className="errormsg">{nameerror}</p>
      </div>
      <br />

      <div>
        <label>Email :&nbsp;&nbsp; </label>
        <TextField
          onChange={(e) => {
            setEmail(e.target.value);
            if (
              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                e.target.value
              )
            ) {
              setEmailerror();
            } else {
              setEmailerror("*Invalid Email accounts*");
            }
          }}
          id="outlined-size-small"
          size="small"
          value={email}
        />
        <p className="errormsg">{emailerror}</p>
      </div>
      <br />

      <div>
        <label> Role :&nbsp;&nbsp;</label>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={role}
            size="small"
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value={"admin"}>Admin</MenuItem>
            <MenuItem value={"teacher"}>Teacher</MenuItem>
            <MenuItem value={"student"}>Student</MenuItem>
          </Select>
        </FormControl>
      </div>
      <p className="errormsg">{roleerror}</p>
      <br />

      <div>
        {universitylist ? (
          <>
            <label> University :&nbsp;&nbsp;</label>
            <br />
            <br />
            <Autocomplete
              id="outlined-basic"
              variant="outlined"
              size="small"
              value={university}
              onChange={(event, newValue) => {
                fetchinstitute(newValue);
                setDepartment();
              }}
              options={universitylist.map((option) => option)}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} />}
            />
          </>
        ) : null}
      </div>
      <p className="errormsg">{universityerror}</p>
      <br />

      <div>
        {institutelist ? (
          <>
            <label> Institute :&nbsp;&nbsp;</label>
            <br />
            <br />
            <Autocomplete
              id="outlined-basic"
              variant="outlined"
              size="small"
              value={institute}
              onChange={(event, newValue) => {
                fetchdepartment(newValue);
                setDepartment();
              }}
              options={institutelist.map((option) => option)}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} />}
            />
          </>
        ) : null}
      </div>
      <p className="errormsg">{instituteerror}</p>
      <br />

      <div>
        {departmentlist ? (
          <>
            <label> Department :&nbsp;&nbsp;</label>
            <br />
            <br />
            <Autocomplete
              size="small"
              value={department}
              onChange={(event, newValue) => {
                fetchlab(newValue);
              }}
              options={departmentlist.map((option) => option)}
              id="controllable-states-demo"
              // options={options}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} />}
            />
          </>
        ) : null}
      </div>
      <p className="errormsg">{departmenterror}</p>
      <br />

      <div>
        {left ? (
          <>
            <label> Labs :&nbsp;&nbsp;</label>
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={left}
              disableCloseOnSelect
              getOptionLabel={(option) => option}
              onChange={(event, value) => setRight(value)}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </li>
              )}
              style={{ width: 500 }}
              renderInput={(params) => <TextField {...params} />}
            />
          </>
        ) : null}
      </div>
      <p className="errormsg">{laberror}</p>
      <br />

      <Button
        onClick={createuser}
        variant="contained"
        style={{ backgroundColor: "#F1C232", color: "black" }}
      >
        Create User
      </Button>
    </div>
  );
}

export default Addusersuperadmin;
