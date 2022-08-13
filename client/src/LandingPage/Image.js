
import React, { useState } from 'react'
import ss from "./ss1.png"

const Image = () => {

  return (
    <div >
        <img className="img" style={{height:"300px",width:"600px",filter: "blur(1px)",position:"relative",right:"0px",top:"100px"}} src={ss}/>
        <img className="img" style={{height:"300px",width:"600px",position:"absolute",right:"200px",top:"120px", boxShadow: "-5px 5px 30px  black "}} src={ss}/>


    </div>
  )
}

export default Image