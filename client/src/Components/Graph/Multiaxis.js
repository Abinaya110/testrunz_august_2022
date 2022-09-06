import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { v4 as uuidv4 } from "uuid";
import "./Graph.css"

import { useParams} from "react-router-dom";
import ApiService from '../../Sevices/ApiService';







function Multiaxis({count,data,setData}) {
  
  let {token} = useParams();
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), x1: "", y1: "", y2: "", y3: "", y4: "" },
  ]);
  const [maxval1, setMaxval1] = useState();
  const [maxval2, setMaxval2] = useState();
  const [maxval3, setMaxval3] = useState();
  const [maxval4, setMaxval4] = useState();

  const [temp, setTemp] = useState();
  const [column, setColumn] = useState();
  useEffect(()=>{
    console.log("hello1", data)
    let value = data
    // console.log("hello2", value[count].plotdata)
    if (value){
  console.log("hello1",typeof value[0])
 
  
  setInputFields(value[count].plotdata)
  setColumn(value[count].axiscount)

  console.log("if",inputFields)
// if(value[count].axiscount){
//   let key =Object.values(value[count].plotdata[0])
//   let keys =key.filter(e => e != "");
  
  
//   // let count = keys.length -2
//   setColumn(keys.length - 2)
//   console.log("count",column)
//   console.log("keys",keys)
//   // console.log("keys",keys)


// }

 
}
// else{
//   console.log("else",data)
//   setInputFields(data[count].plotdata)
   



//   let key =Object.values(data[count].plotdata[0])
//   let keys =key.filter(e => e != "");


//   // let count = keys.length -2
//   setColumn(keys.length - 2)
//   console.log("count",column)
//   console.log("keys",keys)
//   // console.log("keys",keys)
// }
   


  },[])

  const generate = () => {
    setTemp();
    let yval1 = inputFields.map((obj) => obj.y1);
    let yval2 = inputFields.map((obj) => obj.y2);
    let yval3 = inputFields.map((obj) => obj.y3);
    let yval4 = inputFields.map((obj) => obj.y4);

    let newyval1 = yval1.map(Number);
    let newyval2 = yval2.map(Number);
    let newyval3 = yval3.map(Number);
    let newyval4 = yval4.map(Number);

    // let ylist = [...newyval1,...newyval2,...newyval3,...newyval4]
    setMaxval1(Math.max(...newyval1));
    setMaxval2(Math.max(...newyval2));
    setMaxval3(Math.max(...newyval3));
    setMaxval4(Math.max(...newyval4));

    setTemp(inputFields);
    // setData(!temp)
    console.log("InputFields", inputFields);
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputFields(newInputFields);
    if (inputFields[inputFields.length - 1].id === id) {
      setInputFields([
        ...inputFields,
        { id: uuidv4(), x1: "", y1: "", y2: "", y3: "", y4: "" },
      ]);
    }
  };

  // const handleAddFields = () => {
  //   setInputFields([...inputFields, { id: uuidv4(),  x1: "", y1: "" , y2: "", y3: "", y4: "" }])
  // }

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };


  const check=()=>{
    console.log("value saved",column)
    setData(current =>
      current.map(obj => {
        if (obj.id === count+1) {
          return {...obj, plotdata:inputFields, axiscount: column};
        }

        return obj;
      }),
    );
    console.log("data saved",data)
    let patchdata={ 
      data:JSON.stringify(data),
      id:token
    // JSON.stringify(data)
  }
  
    ApiService.patchplotdata(patchdata).then((res) => {
     console.log(res)
      
    });
  

  }
  return (
    <div>
      <h1>MultiAxis Graph {count+1}</h1>
      <label >Column:</label>

      <select onChange={(e)=>{setColumn(e.target.value)}}>
      <option value={1}> 1</option>
  <option value={2} > 2</option>
  <option value={3}> 3</option>
  <option value={4}> 4</option>
</select>




<div className="row">

<div className="column">

      <table>
        <thead>
          <tr>
            <th>XAxis</th>
            <th>YAxis1</th>
            {column >= 2 && <th>YAxis2</th>}
            {column >= 3 && <th>YAxis3</th>}
              {column >= 4 && <th>YAxis4</th>}
            <th>Remove cell</th>
            {/* <th>Add Cell</th> */}
          </tr>
        </thead>
        <tbody>
          {inputFields.map((inputField) => (
            <tr key={inputField.id}>
              <td>
                <input
                  name="x1"
                  style={{ width: "100px" }}
                  value={inputField.x1}
                  onChange={(event) => handleChangeInput(inputField.id, event)}
                />
              </td>

              <td>
                <input
                  name="y1"
                  style={{ width: "100px" }}
                  value={inputField.y1}
                  onChange={(event) => handleChangeInput(inputField.id, event)}
                />
              </td>
{column >= 2 &&
              <td>
                <input
                  name="y2"
                  style={{ width: "100px" }}
                  value={inputField.y2}
                  onChange={(event) => handleChangeInput(inputField.id, event)}
                />
              </td>
}
{column >=3 &&
              <td>
                <input
                  name="y3"
                  style={{ width: "100px" }}
                  value={inputField.y3}
                  onChange={(event) => handleChangeInput(inputField.id, event)}
                />
              </td>
}
{column >= 4 &&
              <td>
                <input
                  name="y4"
                  style={{ width: "100px" }}
                  value={inputField.y4}
                  onChange={(event) => handleChangeInput(inputField.id, event)}
                />
              </td>
}
              <td>
                <button
                  disabled={inputFields.length === 1}
                  onClick={() => handleRemoveFields(inputField.id)}
                >
                  remove
                </button>
              </td>
          
            </tr>
          ))}
        </tbody>
      </table>
  </div>


  <div className="column">

        {temp && (
          <ResponsiveContainer width="50%" aspect={2}>
            <LineChart
              width={500}
              height={300}
              data={temp}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x1" />

              <YAxis yAxisId="right1" orientation="left"  dataKey="y1" domain={[0, maxval1]} />
              {column >=2 &&        <YAxis yAxisId="right2" orientation="left"  dataKey="y2" domain={[0, maxval2]} />}
          {column >=3 &&        <YAxis yAxisId="right3" orientation="left"  dataKey="y3"  domain={[0, maxval3]}/>}
          {column >=4 &&        <YAxis yAxisId="right4" orientation="left"  dataKey="y4"  domain={[0, maxval4]}/>}
          
              <Tooltip />
              <Legend />
              <Line
              yAxisId="right1"
                type="monotone"
                dataKey="y1"
                stroke="#FF0000"
                activeDot={{ r: 8 }}
              />
  {column >=2 &&            <Line
  yAxisId="right2"
                type="monotone"
                dataKey="y2"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
  }
        {column >=3 &&      <Line
        yAxisId="right3"
                type="monotone"
                dataKey="y3"
                stroke="#0000ff"
                activeDot={{ r: 8 }}
              />
        }
         {column >=4 &&     <Line
         yAxisId="right4"
                type="monotone"
                dataKey="y4"
                stroke="#00FF00"
                activeDot={{ r: 8 }}
              />
         }
      

            </LineChart>
          </ResponsiveContainer>
        )}
      
  </div>

  </div>

      <br/>


<Button
variant='contained'
  onClick={()=>generate()}
>Generate</Button>


     {/* <Button  onClick={() => addd()}>
              Save
              
            </Button> */}
            <Button  onClick={() => check()}>
              Update
              
            </Button>

<br/>

      <br />

     
    </div>
  );
}

export default Multiaxis;
