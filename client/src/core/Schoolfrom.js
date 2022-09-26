import { Button, Card, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'
// import { Navigate, useNavigate } from 'react-router-dom';

const SchoolPrivate = () => {

    const[school, setSchool]=useState("")
    const[standard, setStandard]=useState("")
    const[group, setGroup]=useState("")
    const[state,setState] = useState("")
    const[country,setCountry] = useState("")
    // const navigate = useNavigate();

    const handleSubmit=(e)=>{
      e.preventDefault()
      
      if(!school){
        alert("No School selected")
      }
      else if(!standard){
        alert("No Standard selected")
      }
      // else if(!group){
      //   alert("No Group selected")
      // }
      else if(!state){
        alert("No State")
      }
      else if(!country){
        alert("No Country")
      }
      else{
        // navigate('/app')
        console.log("success")
        console.log(school, standard, group, state, country)
      }
    }

  return (

    <div>
      <Card style={{ paddingLeft:"10px",paddingRight:"10px" }}>


        <label>School name</label><br/>
        <Select
          style={{width:"100%", maxHeight:"35px"}}
          value={school}
          onChange={e=> setSchool(e.target.value)}
          >
          <MenuItem value={"achariya"}>Achariya</MenuItem>
          <MenuItem value={"ssv"}>SSV</MenuItem>
        </Select><br/><br/>


        <label>Standard</label><br/>
        <Select
          style={{width:"100%", maxHeight:"35px"}}
          value={standard}
          onChange={e=> setStandard(e.target.value)}
          >
          <MenuItem value={"tenth"}>X</MenuItem>
          <MenuItem value={"eleven"}>XI</MenuItem>
          <MenuItem value={"twelve"}>XII</MenuItem>
        </Select><br/><br/>


        { (standard === "eleven" ||standard ===  "twelve") &&
        <div>
        <label>Group</label><br/>
        <Select
           style={{width:"100%", maxHeight:"35px"}}
           value={group}
           onChange={e=> setGroup(e.target.value)}
          >
           <MenuItem value={"bio"}>Biology</MenuItem>
           <MenuItem value={"computer"}>Computer Science</MenuItem>
           <MenuItem value={"science"}>Pure Science</MenuItem>
        </Select><br/><br/>
        </div>
        }


        <label>State</label><br/>
        <input type="text"
          style={{width:"100%", height:"30px"}}
          value={state}
          onChange={e=>setState(e.target.value)}>
        </input><br/><br/>


        <label>Country</label><br/>
        <input type="text"
          style={{width:"100%", height:"30px"}}
          value={country}
          onChange={e=>setCountry(e.target.value)}>
        </input><br/><br/>


          <Button variant='contained' onClick={handleSubmit}>SUBMIT</Button>

     </Card>
    </div>
  )
}

export default SchoolPrivate