import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ReactHTMLDatalist from "react-html-datalist";
import ApiService from "../../../Sevices/ApiService";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
// import { laboratries } from "./data";
import { useStateValue } from '../../../data/StateProvider';
import { IoIosArrowRoundBack } from 'react-icons/io';
import ApiUrl from "../../../ServerApi";
import Autocomplete from '@mui/material/Autocomplete';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(1),
      zIndex: "200%",
      padding: "1%", 
      height: "10%"
    },
  },
}));

const formContainer = {
  display: "flex",
  flexFlow: "column wrap",
  alignContent: "space-between",
  zIndex: "100%"
};

const style = {
  marginTop: "30px",
  display: "flex",
  justifyContent: "center",
};

const intialValue = {
  studentName: "",
  procedureDescription: "",
  labType: "",
  experimentName: "",
};

const AddUserComponentadmin = (props) => {

  const classes = useStyles();
  const [data, setData] = useState(intialValue);
  const [options, setOptions] = useState();
  const [options1, setOptions1] = useState();
  const [options2, setOptions2] = useState();

  const [universitylist, setUniversitylist] = useState();
  const [institutelist, setInstitutelist] = useState();
  const [departmentlist, setDepartmentlist] = useState();
  const [lablist, setLablist] = useState();
  const [procedurelist, setProcedurelist] = useState();
  

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState(null);
  const [messageerror, setMessageerror] = useState(null);
  const [{ user }, dispatch] = useStateValue();
  const username = user.name
  const useridval = user._id
  const [labTypetosent,setLabTypetosent] = useState()
  const [experimentNametosent,setExperimentNametosent] =useState()
  const [department,setDepartment]=useState()
  const [descriptionerror, setDescriptionerror] = useState();
  const [laberror, setLaberror] = useState();
  const [procedureerror, setProcedureerrorr] = useState();
  const [instituteName, setInstituteName] = useState("");
  const [university, setUniversity] = useState();

useEffect(()=>{
  fetch(`${ApiUrl}/moreInfo/all/university`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUniversitylist(data.ids);
      });
},[])

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


  
  const fetchlab = (department) => {
    setLabTypetosent()
    setExperimentNametosent()
    setOptions1()
    setOptions2()

   
    setDepartment(department)
    fetch(`${ApiUrl}/moreInfo/labs/depandclg`, {
      method: "POST",

      body: JSON.stringify({
        department: department,
        institute:instituteName
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {

        // setOptions2(json.ids)
        setLablist(json.ids)
        console.log(json)

      }
      );
  }


  const fetchexperiment = (newValue) => {
    console.log(user.instituteName,"user clg")
    setLabTypetosent(newValue);
    
    fetch(`${ApiUrl}/moreInfo/experiment`, {
      method: "POST",
   
      body: JSON.stringify({
        lab: newValue,
        institute:instituteName
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => 
    {

      setProcedurelist(json.ids)

   console.log(json)
    }
    );
  }



  const saveUser = (e) => {
    e.preventDefault();
    setProcedureerrorr()
    setLaberror()
    setDescriptionerror()
    if (data.procedureDescription === "" || null) {
      setDescriptionerror("*Write some descriptions*")
    }
    else if (!labTypetosent) {
      setLaberror("*Choose a lab type*")
    }
    else if (!experimentNametosent) {
      setProcedureerrorr("*Select an experiment from the list*")
    }
    else {
      console.log("labtype",labTypetosent)
      let user = {
        studentName: username,
        procedureDescription: data.procedureDescription,
        labType: labTypetosent,
        experimentName: experimentNametosent,
        userId: useridval ,
        instituteName:instituteName,
        university:university,
        department:department
      };
      console.log("list user", user)
      ApiService.addUser(user)
      // .then((res) =>res.json())
      .then((res)=>{
        console.log("check again",res.data)
        if(res.data.errors==="already created"){
          setMessageerror("Already Created");
        setTimeout(() => {
          props.closeModal();
        }, 1000);
        }
        else{
          setMessage("Runz created successfully");
          setTimeout(() => {
            props.closeModal();
          }, 1000);
        }
       
      });
      setOpen(true);
    }




  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value })
    ;
 
  return (
    <div className={classes.root}>

      <Typography variant="h4" style={style}>
        Add Runz &nbsp;&nbsp;&nbsp;&nbsp;
        <IoIosArrowRoundBack
          onClick={props.closeModal}
          style={{
            // color: "red",
            // border: "1px solid black",
            // borderRadius: "50%",
            // background: "white",
            alignItems: "center"


          }}
        />
      </Typography>
      <form style={formContainer}>
  
        <label>Description</label>
        <TextField
          type="text"
          placeholder="Experiment Description"
          fullWidth
          margin="normal"
          name="procedureDescription"
          value={data.procedureDescription}
          onChange={onChange}
        />


        <p className='errormsg'>{descriptionerror}</p>

        {universitylist && <>   <label>University</label>
        <Autocomplete
                value={university}
                onChange={(event, newValue) => {
                  fetchinstitute(newValue)
                  console.log(newValue)
                }}

                options={universitylist.map((option) => option)}
                id="controllable-states-demo"
                // options={options}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} />}
              />
       
        </>
}


{institutelist && <>   <label>Institute</label>
        <Autocomplete
                value={instituteName}
                onChange={(event, newValue) => {
                  fetchdepartment(newValue);
                  setDepartment();
                }}

                options={institutelist.map((option) => option)}
                id="controllable-states-demo"
                // options={options}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} />}
              />
        </>
}

 

     {departmentlist && <>   <label>Department</label>
        <Autocomplete
                value={department}
                onChange={(event, newValue) => {
                  fetchlab(newValue)
                  console.log(newValue)
                }}

                options={departmentlist.map((option) => option)}
                id="controllable-states-demo"
                // options={options}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} />}
              />
       
        </>
}

     {lablist &&<> <label>Lab Name</label>
        <Autocomplete
        value={labTypetosent}
        onChange={(event, newValue) => {
          fetchexperiment(newValue);
        }}
        options={lablist.map((option) => option)}
        id="controllable-states-demo"
        // options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} />}
      />
       <p className='errormsg'>{laberror}</p>
      </> 
}

     {procedurelist&&<>   <label>Procedure Name</label>
        <Autocomplete
        
        value={experimentNametosent}
        onChange={(event, newValue) => {
          setExperimentNametosent(newValue);
        }}
        options={procedurelist.map((option) => option)}
        id="controllable-states-demo"
        // options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} />}
      /> 
     
        <p className='errormsg'>{procedureerror}</p>
        </> 
}
        <br />
        <Button variant="contained"   style={{ backgroundColor:"#F1C232",color:"black" }} onClick={saveUser}>
          Save
        </Button>
        <br />
        <Button variant="contained" color="secondary" onClick={props.closeModal}>
          Cancel
        </Button>
      </form>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={message ?"success" :"error"}>
          {message}
          {messageerror}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddUserComponentadmin;
