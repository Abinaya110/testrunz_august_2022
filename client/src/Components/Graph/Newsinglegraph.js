import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Newsinglegraph = (props) => {
  return (
    <div style={{marginTop:'100px'}}>
      <h4 style={{margin:'50px'}}>Graph</h4>
      
        <ResponsiveContainer width={"100%"} height={500}  >
        <LineChart
          width="100%"
          height={300}
          data={props.lineargraphval}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x_axis" type="number" />
          <YAxis dataKey='y_axis'   domain={[props.minval, props.maxval]}/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="y_axis" stroke="#8884d8" activeDot={{ r: 8 }} />
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Newsinglegraph