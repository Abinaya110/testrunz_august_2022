import { Button, Card } from '@material-ui/core'
import React,{useEffect, useState} from 'react'
import ApiUrl from '../../../../../ServerApi'
import { useStateValue } from '../../../../../data/StateProvider' 
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useHistory, Link } from "react-router-dom";
import { Box, Paper } from '@mui/material';
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    width: "30%",
    height: "auto",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -40%)",
    borderRadius: "2%",
  },
};


const Detailssuperadmin = () => {
    const [{ user }, dispatch] = useStateValue();
    const[departmentlist,setDepartmentlist]=useState()
    const[universitylist,setUniversitylist]=useState()
    const[university,setUniversity]=useState()
    const[institutelist,setInstitutelist]=useState()
    const[instituteName,setInstituteName]=useState()
    const [modalOpen, setModalOpen] = useState(false);
    const[details,setDetails]=useState()
    const history = useHistory()
    useEffect(()=>{

      fetch(`${ApiUrl}/moreInfo/all/university`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUniversitylist(data.ids);
      });
      
    },[])

// Modal controller
const openModal = () => {
  // window.localStorage.clear();
  setModalOpen(() => true);
};
const closeModal = () => {
  // window.localStorage.clear();
  setModalOpen(() => false);
};

  // getinstitute
  const fetchinstitute = (university) => {
    setUniversity(university);
    setInstituteName("");
 

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
  }

  //getdetail
  const getdetail=()=>{
    fetch(`${ApiUrl}/moreInfo/getdetail/university/institute`,{
    method: "POST",

    body: JSON.stringify({
      university: university,
      instituteName:instituteName
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
  
     console.log(json.list)
      if(json.list.length > 0){
        setDepartmentlist(json.list)
      }
     

    }).catch((err)=>{
      console.log(err,"hhh")
    })
}

//getmoreinfo
const getmoreinfo=(department,institute,university)=>{
console.log(department,institute,university)

fetch(`${ApiUrl}/moreInfo/getdetail/university/institute/department`,{
  method: "POST",

  body: JSON.stringify({
    university: university,
    instituteName:instituteName,
    department:department
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
})
  .then((response) => response.json())
  .then((json) => {

 
   setDetails(json)
  
   setModalOpen(true)

  }).catch((err)=>{
    console.log(err,"hhh")
  })




}

  return (
    <div>

      
      {universitylist && (
                      <div className="form-group">
                        <label className="text-muted">University</label>
                        <br /> <br />
                        <Autocomplete
                          // style={{ width: "100%" }}
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
 <br /> <br />
{institutelist && (
                      <div className="form-group">
                        <label className="text-muted">Institute Name</label>
                        <br /> <br />
                        <Autocomplete
                          // style={{ width: "100%" }}
                          id="outlined-basic"
                          variant="outlined"
                          size="small"
                          value={instituteName}
                          onChange={(event, newValue) => {
                           setInstituteName(newValue)
                          }}
                          options={institutelist.map((option) => option)}
                          sx={{ width: 300 }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </div>
                    )}

      { 
      instituteName && university &&
      <Button variant="contained"    style={{ backgroundColor:"#F1C232",color:"black",marginTop:'20px' }} onClick={getdetail}>Get Info</Button>
      }










<Modal
        isOpen={modalOpen}
        appElement={document.getElementById('root')}
        style={customStyles}
        contentLabel="add runz Modal"
        disableBackdropClick="true"
        sx={{ overflow: 'hidden' }}
        
      >
        <div>
       
       {  details &&
       <p style={{padding:'15px'}}>

<span style={{fontWeight:'bold',paddingRight:'20px'}}>Department:</span> {details.department} <br/>
<span style={{fontWeight:'bold',paddingRight:'20px'}}>No of Admins :</span>{details.admin}<br/>
<span style={{fontWeight:'bold',paddingRight:'20px'}}>No of Teachers :</span>{details.teachers}<br/>
<span style={{fontWeight:'bold',paddingRight:'20px'}}>No of Students :</span>{details.students}<br/>
<span style={{fontWeight:'bold',paddingRight:'20px'}}>Total no of runz created in this Department:</span>{details.listofrunz}<br/>
<span style={{fontWeight:'bold',paddingRight:'20px'}}>list of labs available :</span>
      
       { 
       
       details.list.map((item)=>{
  return (
    <li key={item}>{item}</li>
  )
})}

       </p>
      
}
<Button   style={{ backgroundColor:"#F1C232",color:"black" }} onClick={()=>setModalOpen(false)}>back</Button>
</div>
      </Modal>





     
    









<Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 2,
          width: 600,
          height: 80,
        },
      }}
    >
        {
            departmentlist&&
            departmentlist.map((item)=>{
                return (
                  <Paper elevation={3}  key={item} style={{padding:'10px',backgroundColor:'	#E5E4E2',cursor: "pointer"}}  onClick={()=>{getmoreinfo(item,instituteName,university)}}> 
                  
                  
                 <span style={{fontWeight:'bold'}}>Department:</span> {item}<br/>
                 <span style={{fontWeight:'bold'}}>Institute:</span> {instituteName}<br/>
                 <span style={{fontWeight:'bold'}}>University:</span> {university}
                  
                  </Paper>
                )
              })}
        

    </Box>


    </div>
  )
}

export default Detailssuperadmin