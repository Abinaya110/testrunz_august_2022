// import './App.css';

import React, { useEffect, useState } from 'react'
// import Graph from "./Graph/Graph"
import Multiaxis from './Multiaxis';
import { v4 as uuidv4 } from "uuid";
import ApiUrl from '../../ServerApi';
import ApiService from '../../Sevices/ApiService';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useParams} from "react-router-dom";
const Graph = () => {
  const [count,setCount]=useState()
  const [axisCount, setAxisCount] = useState(0);
  const [data, setData]=useState()
  let {token} = useParams();
  let dummydata= [
    {id:1,plotdata:[{ id: uuidv4(), x1: "", y1: "", y2: "", y3: "", y4: "" },],axiscount:1},
    {id:2,plotdata:[{ id: uuidv4(), x1: "", y1: "", y2: "", y3: "", y4: "" },],axiscount:1},
    {id:3,plotdata:[{ id: uuidv4(), x1: "", y1: "", y2: "", y3: "", y4: "" },],axiscount:1},
    {id:4,plotdata:[{ id: uuidv4(), x1: "", y1: "", y2: "", y3: "", y4: "" },],axiscount:1},
    
  ];
 useEffect(()=>{

console.log("this is token",token)
 
var start = new Date().getTime();

fetch(`${ApiUrl}/experiments/${token}`)
.then((res)=>res.json())
.then(data =>{
  console.log("modify here",data)
  if(data.plotdata){
    setData(JSON.parse(data.plotdata))
  }
  else{
    setData(dummydata)
  }
})
  let value = localStorage.getItem("inputFields")
  console.log(value)
 
 },[])




 const getdata=()=>{
  let value = localStorage.getItem("inputFields")
  console.log(value)
  if(value){

    setData(JSON.parse(value))
    console.log("getif",data)
  }
  else{
    
    setData(dummydata)
    console.log("getelse",data)
    console.log("getelse",dummydata)
  }
 }
  
  return (
    <div>
<h4 >GRAPH: </h4>
<br/>
<label style={{paddingTop:"15px"}}>No of Graph: </label>

{console.log(data)}
<FormControl sx={{ m: 1, minWidth: 120 }} size="small">

        <Select
      
          value={axisCount}
          size="small"
    
          onChange={(e)=>{setAxisCount(parseInt(e.target.value));console.log(axisCount)}}
        >
          <MenuItem value={1}>One</MenuItem>
          <MenuItem value={2}>Two</MenuItem>
          <MenuItem value={3}>Three</MenuItem>
          <MenuItem value={4}>Four</MenuItem>
        </Select>
      </FormControl>


     
      {  [...Array(axisCount)].map((e, i) => 
      <span key={i}>
        <Multiaxis count={i} data={data} setData={setData}/> 
        <hr/>
        </span>)
      
 }


     

    </div>
  )
}

export default Graph