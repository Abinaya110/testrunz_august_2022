import React, { useState, useEffect ,useLayoutEffect} from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
//import Layout from "./Layout";
import TextField from "@mui/material/TextField";

import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@material-ui/core/MenuItem';

import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { actionTypes } from "../data/reducer"
import CardContent from '@material-ui/core/CardContent';
import { useStateValue } from '../data/StateProvider';
import ApiUrl from "../ServerApi";
import { Button } from "@mui/material";
const useStyles = makeStyles({
  root: {
    width: "50%",
    minWidth:"300px",
    marginTop: "50px",
    marginRight: 'auto',
    marginLeft: 'auto',
    
  },

});

const Instituteform = (props) => {
  const [_id, set_id] = useState("")
  const [institutenameerror, setInstitutenameerror] = useState()
  const [departmenterror, setDepartmenterror] = useState()
  const [countryerror, setCountryerror] = useState()
  const [stateerror, setStateerror] = useState()
  const [yearerror, setYearerror] = useState()
  const [semestererror, setSemestererror] = useState()

  const [role, setRole] = useState("")
  const [instituteName, setInstituteName] = useState("")
  const [department, setDepartment] = useState("")
  const [instituteNametemp, setInstituteNametemp] = useState("")
  const [departmenttemp, setDepartmenttemp] = useState("")
  const [country, setCountry] = useState("")
  const [state, setState] = useState("")
  const [year, setYear] = useState("")
  const [semester, setSemester] = useState("")
  const [showOnce, setShowOnce] = useState(false)
  const [btnText, setBtnText] = useState("submit")
  const [options1,setOptions1]=useState()
  const [options2,setOptions2]=useState()
  const [goTo, setGoTo] = useState(false);

  const [{ user }, dispatch] = useStateValue();
  const classes = useStyles();


  useEffect(()=>{
  
   set_id(user._id)
console.log("private",user)
  if(user.department){
    setDepartmenttemp(user.department)
  }
  if(user.instituteName){
    setInstituteNametemp(user.instituteName)
    fetchdepartment(user.instituteName)
  }
  if(user.role){
    setRole(user.role)
  }
   if(user.showOnce===true){
    props.history.push("/app");
   }
   fetch(`${ApiUrl}/moreInfo/all/institute`)
   .then(response => response.json())
   .then(data => {
     console.log(data)
     setOptions1(data.ids)


   });
  },[])
  

//   const loadProfile = () => {
//  let idval = JSON.parse(localStorage.getItem('userdetail'))._id
//  console.log("helloo id",idval)
 
//  fetch(`${process.env.REACT_APP_API}/users/${idval}`)
//     .then(response => response.json())
//     .then(data => console.log("helloo eiwfklwejfklsd",data))
//     .catch((error) => {
//       console.error('Error:ererere', error);
//     });

//    };

const fetchdepartment = (aa) => {

  setInstituteName(aa)
  setDepartment()

  fetch(`${ApiUrl}/moreInfo/department`, {
    method: "POST",

    body: JSON.stringify({
      institute: aa
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => response.json())
    .then(json => {

      setOptions2(json.ids)

      console.log(json)
    }
    );
}

 

  const clickSubmit = (event) => {
    event.preventDefault();

    setInstitutenameerror()
    setDepartmenterror()
    setCountryerror()
    setStateerror()
    setYearerror()
    setSemestererror()
 
setInstituteName(instituteName||instituteNametemp)
setDepartment(department||departmenttemp)
console.log("check here",department)
  if (!instituteName) {
    console.log("no institute name")
    setInstitutenameerror("*Institute Name required*")
  } 
  else if (!department) {
    console.log("no department name")
    setDepartmenterror("*Department required*")
  }
  else if (!country) {
    console.log("no country name")
    setCountryerror("*Country required*")
  } 
  else if (state === ""||null ) {
    console.log("no password")
    setStateerror("*State required*")
  }
  else if ((role === "student") && (year === ""||null) ) {
    console.log("no year")
    setYearerror("*Year required  enter a valid number*")
  } 
  else if((role === "student") &&  parseInt(year)> 4 ||parseInt(year)<1){
    setYearerror("Year must be from 1 to 4")
  }
  else if ( (role === "student") && (semester === ""||null)) {
    console.log("no semester")
    setSemestererror("*Semester required enter a valid number*")
  }
  else if((role === "student") &&  parseInt(semester) >8 ||parseInt(semester)<1){
    setSemestererror("Semester must be from 1 to 8")
  }
 else{
 
   setBtnText("Submitting");
    fetch(`${process.env.REACT_APP_API}/users/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
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
//       .then((response) => {
//         setCredit({
//           ...credit,
//           instituteName: "",
//           department: "",
//           country: "",
//           state: "",
//           year: "",
//           semester: "",
//           btnText: "Submitted",
//           showOnce: true,
//         });
.then((response) => {
;

 
        fetch(`${process.env.REACT_APP_API}/users/${user._id}`)
        .then(res => res.json())
        .then(json => {
        dispatch({
          type: actionTypes.SET_USER,
          user: json,
      });
      toast.success("Profile updated successful");
      props.history.push("/app");
      // history.push("/private");
     })
  })
      .catch ((error) => {
  console.log("Sign-up error", error);
  setBtnText("Submit")
  toast.error("error.response.data.error");
});


  

 }

  };


return (
  <Card className={classes.root}>
    <CardContent style={{ alignItems: "center" }}>
      <div >
        <ToastContainer />
        {showOnce && props.history.push("/app")}

        {(showOnce === false) && (<> <p className="lead text-center">Profile Update</p>
          <form>
           
          {   !instituteNametemp ?   <>      
           {options1&& <div className="form-group">
              <label className="text-muted">Institute Name</label>
              <br/> <br/>
              <Autocomplete
              style={{width:"100%"}}
            id="outlined-basic"
            variant="outlined"
            size="small"
            value={instituteName}
            onChange={(event, newValue) => {
              fetchdepartment(newValue);
              setDepartment()
            }}
            options={options1.map((option) => option)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} />}
          />
            </div>
          }
            <p className='errormsg'>{institutenameerror}</p>
            </>
            :
            <>
            <label className="text-muted">Institute Name : {instituteNametemp}</label>
            <br/>
          
            </>
            }
            
    {   !departmenttemp ?   <>  
   {options2 && <div className="form-group">
              <label className="text-muted">Department</label>
              <br/> <br/>
              <Autocomplete
              style={{width:"100%"}}
            value={department}
            size="small"
            onChange={(event, newValue) => {
             setDepartment(newValue)
              
            }}
            options={options2.map((option) => option)}
            id="controllable-states-demo"
            // options={options}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} />}
          />
            </div>}
            <p className='errormsg'>{departmenterror}</p>
            </>:
            <>
            <label className="text-muted">Department :{departmenttemp}</label>
          
            </>

}
            <div className="form-group">
              <label className="text-muted">Country</label>
              <input
                onChange={e => setCountry(e.target.value)}
                type="text"
                className="form-control"
                value={country}
              />
            </div>
            <p className='errormsg'>{countryerror}</p>
            <div className="form-group">
              <label className="text-muted">State</label>
              <input
                onChange={e => setState(e.target.value)}
                type="text"
                className="form-control"
                value={state}
              />
            </div>
            <p className='errormsg'>{stateerror}</p>
            {role === "student" && (
              <>
                <div className="form-group">
                  <label className="text-muted">Year</label>
                  <input
                    onChange={e => setYear(e.target.value)}
                    className="form-control"
                    value={year}
                    type="number"
                    min="1"
                    max="4"
                  />
                </div>
                <p className='errormsg'>{yearerror}</p>
                <div className="form-group">
                  <label className="text-muted">Semester</label>
                  <input
                    onChange={e => setSemester(e.target.value)}
                    className="form-control"
                    value={semester}
                    type="number"
                    min="1"
                    max="8"
                  />
                </div>
                <p className='errormsg'>{semestererror}</p>
              </>
            )}
            <br />
            {/* <div style={{ marginLeft:"auto", marginRight:"auto"}}> */}
              <Button variant="contained" style={{backgroundColor:"#f1c232", marginLeft:"45%", marginRight:"50%"}} onClick={clickSubmit}>
                {btnText}
              </Button>
              <br />

            {/* </div> */}
          </form>

        </>)}
      </div>
    </CardContent>
    {/* {window.location.reload(true)} */}
  </Card>

);
};

export default Instituteform;

