import React from "react";
import ss from "./ss1.png"
import "./Page1.css";

const Page1 = () => {
  return (
<div className= "page1 ">
<div className="page1__content">
<h1 className="page1__title" style={{color:'white'}}>Digital experimentation</h1>
<p>
<ul style={{ listStyleType: 'circle',fontSize:"15px" ,fontWeight:'bold',color:'white'}}>
      <li>Students carry out experiments with predefined experiments.</li>
      <li>Streamlines the experimentation and learning process.</li>
      <li>Free up the students to focus on the insights.</li>
      <li>Give the opportunity to gain practical and industry experience.</li>
      <li>Enables seamless collaboration between students and teachers.</li>
    </ul>
</p>
<p style={{color:'white'}}>A web based application that streamlines the experimentation workflow by digitising test steps, post processing of the test data and automatic report generation.</p>
</div>
<img src={ss} alt="applayout" className="page1__image" />

</div>
  );
};

export default Page1;
