import Grid from "@material-ui/core/Grid";
import Modal from "react-modal";
// import Graph from "../Graph/Graph";
import ApiUrl from "../../../ServerApi";
import Swal from 'sweetalert2'

import Lodaing from "../../RouterComponent/user/Lodaing";
import { Editor } from "@tinymce/tinymce-react";

import { VscGraphLine } from "react-icons/vsc";
import React, { useEffect, useRef, useState } from "react";
import * as html2json from "html2json";
import parse from "html-react-parser";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { FaDownload } from "react-icons/fa";
import { ImCloudUpload } from "react-icons/im";
import { BsFillCalculatorFill } from "react-icons/bs";
import { useParams } from "react-router-dom";

import "../layout.css";
import Alert from "@mui/material/Alert";
import { GridLoadingOverlay } from "@material-ui/data-grid";

// import { stableValueHash } from "react-query/types/core/utils";
import Snackbar from "@mui/material/Snackbar";
import jsPDF from "jspdf";
import { SiMicrosoftword } from "react-icons/si";
import ApiService from "../../../Sevices/ApiService";
import Graphcomponent from "../../Newgraph/Graphcomponent";
import { TextareaAutosize, TextField } from "@mui/material";

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Graph from "../../Graph/Graph";
















const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    width: "30%",
    height: "60%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "2%",
  },
};

const useStyles = makeStyles({
  root: {
    width: "1000px",
  },
  paper: {},
});

const SharedRecord = ({ data, datavalues }) => {
  const classes = useStyles();
  const [htmlContext, setHtmlContext] = React.useState(null);
  const [statusmessagee, setStatusmessagee] = React.useState("");
  const [statusmessages, setStatusmessages] = React.useState("");
  const [opene, setOpene] = React.useState(false);
  const [opens, setOpens] = React.useState(false);
  const [result, setResult] = React.useState({});
  const [errorvalue, setErrorvalue] = React.useState();
  const [accord, setAccord] = React.useState(false);
  const [output, setOutput] = React.useState({});
  const [expresultval, setExpresultval] = React.useState();
  const vertical = "button";
  const horizontal = "center";
  const [graphview, setGraphview] = React.useState(false);
  const [lineargraphval, setLineargraphval] = React.useState();
  const [minval, setMinval] = React.useState();
  const [maxval, setMaxval] = React.useState();
  const [mark, setMark] = React.useState();
  const [remark, setRemark] = React.useState();

  const [modalOpen, setModalOpen] = useState(false);
  const editorRef = useRef(null);
  const [graphdata, setGraphdata] = useState();
  const [graph2data, setGraph2data] = React.useState();

  const options = ["1","2","3","4","5","6","7","8","9","10"];
  const defaultOption = options[0];
  let { token } = useParams();
  //console.log({ ...data });
  React.useEffect(() => {
    console.log("data", data);
    axios
      .get(`${ApiUrl}/procedures/search/${data.experimentName}`)
      .then((res) => {
        // setHtmlContext((prev) => {
        //   if (prev === null) return res.data;
        // });
        setHtmlContext(res.data);
        fetch(`${ApiUrl}/experiments/${token}`)
          .then((res) => res.json())
          .then((data) => {
            console.log("check here",token)
            // const datavalues = JSON.parse(data.datas);
            setExpresultval(data.expresult);
            setMark(data.grade)
            setRemark(data.remark)
            setGraphdata(data.plotdata)
            console.log("datas are", datavalues);

            const filtered = Object.entries(JSON.parse(data.datas)).filter(
              ([key, value]) => key != ""
            );
            const obj = Object.fromEntries(filtered);

            for (const [key, values] of Object.entries(obj)) {
              document.getElementById(key).value = values;
            }
            setOpens(true);
            setStatusmessages("Data has been Retrived");
            for (const [key, values] of Object.entries(obj)) {
              document.getElementById(key).setAttribute("readonly", "readonly");
            }
            if(graphdata){
              setGraphview(true)
              console.log("hai")
            }

            console.log(datavalues);
            fetch(`${ApiUrl}/runPython/`, {
              method: "POST",
              body: JSON.stringify({
                ...datavalues,
                title: `${data && data?.experimentName}`,
              }),
              headers: { "Content-Type": "application/json" },
            })
              .then((responce) => responce.json())
              .then((data) => {
                console.log("result", data);
                setResult(data);
                setOpens(true);
                setStatusmessages("Calculation Completed");
                setAccord(true);
              })
              .catch((error) => {
                setOpene(true);
                setErrorvalue("Check the values you have Entered");
                setStatusmessagee("Check the values you have Entered");
              });
          })
          .catch((error) => {
            setOpene(true);
            setStatusmessagee("Error In data Retrive");
            console.log("error is", error);
          });
      });
  }, [data.experimentName]);

  // model setup
  const openModal = () => {
    // window.localStorage.clear();
    setModalOpen(() => true);
  };

  const closeModal = () => setModalOpen(() => false);

  //
  const updatescore = () => {
    fetch(`${ApiUrl}/experiments/grade/remark`, {
      method: "PATCH",
      body: JSON.stringify({ property:"grade",value: mark, id: token }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((data) => {
        console.log("result", data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
//
  const updateremark = () => {
    fetch(`${ApiUrl}/experiments/grade/remark`, {
      method: "PATCH",
      body: JSON.stringify({ property:"remark",value: remark, id: token }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((data) => {
        console.log("result", data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
//  
  const updatescoreandremark = (tag, value, id) => {
  fetch(`${ApiUrl}/experiments/grade/remark`, {
    method: "PATCH",
    body: JSON.stringify({
      [tag]: value,
      id: id,
      status:"reviewed"
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      Swal.fire(
        'Assigned',
        `${tag} has been to the updated`,
        'success'
      )
 
    });
};

  // graph
 const graph=()=>{
  setGraphview(true)
  // var aElement = document.querySelector("input"); 
  // aElement.setAttribute("readonly", "readonly"); 
 }
  

  const handleClosee = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpene(false);
  };
  const handleCloses = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpens(false);
  };
  const accordchange = () => {
    setAccord(!accord);
  };
  const uses = htmlContext?.html.child.map((ele) => ele);
  return (
    <>
      <Modal
        isOpen={modalOpen}
        appElement={document.getElementById("root")}
        style={customStyles}
        contentLabel="add runz Modal"
        disableBackdropClick="true"
        sx={{ overflow: "hidden" }}
      >
                          <FormControl >

<Select
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  size="small"
  style={{width:"100px"}}
  value={mark}
  onChange={(e) => setMark(e.target.value)}  

>
  <MenuItem value={1}>1</MenuItem>
  <MenuItem value={2}>2</MenuItem>
  <MenuItem value={3}>3</MenuItem>
  <MenuItem value={4}>4</MenuItem>
  <MenuItem value={5}>5</MenuItem>
  <MenuItem value={6}>6</MenuItem>
  <MenuItem value={7}>7</MenuItem>
  <MenuItem value={8}>8</MenuItem>
  <MenuItem value={9}>9</MenuItem>
  <MenuItem value={10}>10</MenuItem>

</Select>
</FormControl>

                <Button  variant="contained"  style={{ backgroundColor: "#F1C232", color: "black",margin: "0 0 20px 20px" }} onClick={()=>updatescoreandremark("grade",mark,token)}>update score</Button>

        <TextareaAutosize onChange={(e)=>{setRemark(e.target.value)}} value={remark} style={{ width: "100%", height: "70%" }} />
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={4}
          style={{marginTop:"5%"}}
        >
          <Button variant="contained"  style={{ backgroundColor: "#F1C232", color: "black" }}  onClick={()=>updatescoreandremark("remark",remark,token)}> update remark</Button>
          <Button variant="contained" color="error" onClick={closeModal}> close</Button>
        </Stack>
      </Modal>
      <Grid container className={classes.root} spacing={2}>
        <Grid item>
          <div className={classes.paper}>
            <h5>Submitted section</h5>

            {/* <Contextshared value={htmlContext} dataV={data} datavalues={datavalues}/>  */}
            {htmlContext ? (
              <div>
                {/* <div id="generator" style={{width:"600px", padding:"50px"}}> */}
                <div id="generator">
                  <div className="containeer">
                    <form>
                      {uses.map((el) =>
                        parse(htmlContext?.html && html2json.json2html(el))
                      )}
                    </form>
                  </div>
                  <div>
                    {graphview && 
                    <div className="graphinput">

                      <Graph/>
                    </div>
                     }
                  </div>
                  <br />
                  <br />
                  {/* {expresultval &&
          <Editor
              initialValue={expresultval}
        apiKey="au50u78j9vjabzcr4icg4v3oknubu08ifv9rfstawlzmdobp"
        init={{
          menubar:false,
          statusbar: false,
          toolbar: false,
          selector: "textarea",
          plugins: 'link image code lists directionality',
          directionality: "ltr",
       
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      
        }}
    
      />
}   */}
                  {expresultval && (
                    <Accordion expanded={true}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        onClick={accordchange}
                      >
                        <Typography className={classes.heading}>
                          Submitted Result
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <div
                            className="content"
                            dangerouslySetInnerHTML={{ __html: expresultval }}
                          ></div>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  )}
                  <Accordion expanded={accord}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                      onClick={accordchange}
                    >
                      <Typography className={classes.heading}>
                        Actual Result
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <p>Result will be shown here</p>
                        {
                          errorvalue ? (
                            <p style={{ color: "red" }}>*{errorvalue}*</p>
                          ) : (
                            Object.keys(result).map((item) => {
                              return Object.keys(result[item][0]).map((i) => {
                                return (
                                  <p>
                                    {i} : {result[item][0][i]}
                                  </p>
                                );
                              });
                            })
                          )
                          // <p>{output}</p>
                        }
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
                <br />
                <br />
                <Stack
                  spacing={2}
                  direction="row"
                  style={{ position: "relative", left: "25%" }}
                >
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#F1C232", color: "black" }}
                    onClick={graph}
                  >
                    Graph &nbsp;&nbsp;&nbsp;
                    <VscGraphLine />
                  </Button>
                  {/* <input onChange={(e) => setMark(e.target.value)}  value={mark}/> */}



                  <Button  variant="contained"  style={{ backgroundColor: "#F1C232", color: "black" }} onClick={openModal}>remark</Button>
                </Stack>

                <Snackbar
                  open={opene}
                  autoHideDuration={3000}
                  onClose={handleClosee}
                  anchorOrigin={{ vertical, horizontal }}
                >
                  <Alert
                    onClose={handleClosee}
                    severity="error"
                    sx={{ width: "100%" }}
                  >
                    {statusmessagee}
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={opens}
                  autoHideDuration={3000}
                  onClose={handleCloses}
                  anchorOrigin={{ vertical, horizontal }}
                >
                  <Alert
                    onClose={handleCloses}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    {statusmessages}
                  </Alert>
                </Snackbar>

                {/* <Button onClick={call}>call</Button> */}
              </div>
            ) : (
              <Lodaing />
            )}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default SharedRecord;
