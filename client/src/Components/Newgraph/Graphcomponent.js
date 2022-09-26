

import React, { useEffect, useState } from "react";
import MultilineChart from "./MultilineChart";
// import Simpleline from "./Simpleline";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


// import schc from "./SCHC.json";
// import vcit from "./VCIT.json";
// import portfolio from "./PORTFOLIO.json";
// import dummy from "./Dummy.json";
// const portfolioData = {
//     name: "Portfolio",
//     color: "#d53e4f",
//     items: portfolio
//   };
 
// const portfolioData = { name: "Portfolio", color: "#ffffff", items: portfolio };
// const schcData = { name: "SCHC", color: "#d53e4f", items: schc };
// const vcitData = { name: "VCIT", color: "#5e4fa2", items: vcit };
const dimensions = {
  width: 600,
  height: 300,
  margin: { top: 30, right: 30, bottom: 30, left: 65 }
};

  


export default function Graphcomponent(props) {
//   const X1 = [1,2,3,4,5,6,7,8,9,10]
// const Y1= [1,2,3,6,8,5,3,1,5,7]
// const Y2= [1,4,6,1,9,5,5,3,4,5]
// const Y3= [2,3,4,6,8,6,4,10,8,2]
// const Y4= [0,2,2,9,8,7,9,8,7,9]
// const list =["X1","Y1","Y2","Y3","Y4"]

// const [x1temp,setX1temp]=useState()
// const [y1temp,setY1temp]=useState()

// const create=()=>{
//   for (let x of X1) { // Defines for loop with a variable of 'item'
//     obj = {"X":x,}
//   }
// }
const [graph1, setGraph1] = useState();
const [graph2, setGraph2] = useState();
const [graph3, setGraph3] = useState();
const [graph4, setGraph4] = useState();



let schcData={}
let dummyData={}
let dummyData2={}



useEffect(()=>{
    console.log(props.data)
  let dataarr=[]
  for(var i = 0; i < props.data.X1.length; i++){
   let  temp = {"X":props.data.X1[i],"Y":props.data.Y1[i]}
    dataarr.push(temp);
  }


  let dataarr2=[]
  for(var i = 0; i < props.data.X1.length; i++){
   let  temp = {"X":props.data.X2[i],"Y":props.data.Y2[i]}
    dataarr2.push(temp);
  }
 


  let dataarr3=[]
  for(var i = 0; i < props.data.X1.length; i++){
   let  temp = {"X":props.data.X3[i],"Y":props.data.Y3[i]}
    dataarr3.push(temp);
  }

schcData = {
    name: "VCIT",
    color: "blue",
    items: dataarr
  };
  dummyData = {
    name: "VCIT",
    color: "green",
    items: dataarr2
  };
  dummyData2 = {
    name: "VCIT",
    color: "red",
    items: dataarr3
  };
 setGraph1(schcData)
 setGraph2(dummyData)
 setGraph3(dummyData2)
 console.log(dataarr3)
  
},[])

  return (
    <div className="App" style={{backgroundColor:"white"}}>
    {  graph1 &&
    <>
      
      <MultilineChart  data={[graph1,graph2,graph3]}
      dimensions={dimensions}/>
      </>
}

      {/* <Simpleline 
      data={dataarr}
      dimensions={dimensions}
      />  */}
      </div>
      )}