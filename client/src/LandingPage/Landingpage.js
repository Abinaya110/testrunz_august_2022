
import Page1 from "./Page1";
import "./Landingpage.css"
import  Slider  from "./Slider";
import about from "./assets/about.mp4";
import solution from "./assets/solution.svg";

import Header from "./Header"
import { Button } from "@mui/material";
import  Footer  from "./Footer";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

function Landingpage() {

  return (
    <div className="area">

      {/* <Header/> */}
      <Page1  />
      <br/>
      <Button variant="outlined" style={{color:"#F1C232",borderColor:"#F1C232",backgroundColor:"rgba(1 ,1 ,1, .5)",display: "block",marginLeft:"auto",marginRight:"auto"}}  onClick={()=>{window.location.href = '/#/signup'}}>Get Started <ArrowRightAltIcon/> </Button>

      <br/><br/><br/><br/><br/><br/>
       <Slider
        imageSrc={about}
        title={"Problem"}
        subtitle={
          "Performing experiments is one of the most important way a student learns and acquies hands on knowledge in school and universities."
        }
      />
    <br/><br/>
      <Slider
        imageSrc={solution}
        title={"Solution"}
        subtitle={"A web based application that streamlines the experimentation workflow by digitising test steps, post processing of the test data and automatic report generation. The Testrunz also provides capability for the students and teachers to collaborate in real time."}
        flipped={true}
      /> 

<Footer/>
    </div >
  );
}

export default Landingpage;
