import React, { useState, useCallback, useEffect, useRef } from "react";
import path from "path";
import Modal from 'react-modal';
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Swal from 'sweetalert2'
import { nanoid } from "nanoid";
import { Button } from "@material-ui/core";
import "./procedure.css";
import ApiUrl from "../../../../ServerApi";
import { GiCoinsPile } from "react-icons/gi";
import { Grid, TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { userInfo } from "os";
import { useStateValue } from '../../../../data/StateProvider';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    
    },
    overlay: {zIndex: 1000}
  };
  
  



const Editprocedure = (props) => {
    const editorRef = useRef(null);
    const [experiment,setExperiment]=useState()
    const [labtype,setLabtype]=useState()
    const [department,setDepartment]=useState()
    const [year,setYear]=useState(1)
    const [semester,setSemester]=useState(1)
    const [institute,setInstitute]=useState()
    const [university,setUniversity]=useState()
    const [modalopen,setModalopen]=useState()
    const [{ user }, dispatch] = useStateValue();
    const [initialcontent,setInitialcontent]=useState()
    const [procedureid,setProcedureid]=useState()
    const [moreinfoid,setMoreinfoid]=useState()
    let content = props.location.pathname.replace("/editProce/", "") || window.localStorage.getItem("proceId");

    // const fetch = useCallback(() => {
    //     axios.get(`${ApiUrl}/procedures/test/${content}`).then((res) => {
    //       setInitialcontent( res.data.html );
    //       setProcedureid(res.data._id)
    //     });
    
    //     axios.get(`${ApiUrl}/moreInfo/${content}`).then((res) => {
    //   console.log("check",res.data)
    //   setExperiment(res.data.ProcedureName)
    //   setLabtype(res.data.labtype)
    //   setDepartment(res.data.department)
    //   setYear(res.data.year)
    //   setSemester(res.data.semester)
    //   setInstitute(res.data.institute)
    //   setUniversity(res.data.university)
    //   setMoreinfoid(res.data._id)
    //     });
    //   }, [content]);
    
      useEffect(() => {
        // fetch();
    
        // return () => {};
      }, []);

      useEffect(()=>{
        axios.get(`${ApiUrl}/procedures/test/${content}`).then((res) => {
          setInitialcontent( res.data.html );
          setProcedureid(res.data._id)
        });
    
        axios.get(`${ApiUrl}/moreInfo/${content}`).then((res) => {
      console.log("check",res.data)
      setExperiment(res.data.ProcedureName)
      setLabtype(res.data.labtype)
      setDepartment(res.data.department)
      setYear(res.data.year)
      setSemester(res.data.semester)
      setInstitute(res.data.institute)
      setUniversity(res.data.university)
      setMoreinfoid(res.data._id)
        });
      },[])





    const showmodal=(e)=>{
        e.preventDefault();
        setModalopen(true)
      }

      const handleSave = (e) => {
        
    
        // if (!titleRef.current.value ){
        //   experimentval = state1.experiment
        // }
        // else if (!labRef.current.value ){
        //   labval = state1.lab
        // }
        // else if (!departmentRef.current.value ){
        //   Departmentval = state1.department
        // }
        // else if (!yearRef.current.value ){
        //   yearval = state1.year
        // }
        // else if (!instituteRef.current.value ){
        //   instituteval = state1.institute
        // }
        // else if (!semesterRef.current.value ){
        //   semval = state1.semester
        // }
    // console.log("content here",titleRef.current.value)
    // console.log(state1.experiment)
    
      
        axios
          .patch(`${ApiUrl}/procedures/edit`, {
            title: experiment,
            html: editorRef.current.getContent(),
            content:procedureid||content,
          })
          .then((res) => {
          
      // console.log("done phase1",titleRef.current.value,labRef.current.value)
            axios
              .patch(`${ApiUrl}/moreInfo/edit`, {
              
                experiment: experiment,
                lab: labtype,
                department: department,
                year: year,
                institute: institute,
                semester: semester,
                university:university,
                _id:moreinfoid
              })
              .then((res) => {
              
                if(res.data == "error"){
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong Check your internet connection',
                 
                  })
                }
                else{
                Swal.fire(
                  'success',
                  'Procedure has been updated',
                  'success',
                )
             
                }
              });
          });
      };
    


const goBack = () => {
    props.history.push("/procedure");
  };

  const deleteexperiment=()=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      console.log("button result",result)
      if (result.isConfirmed) {



        fetch(`${ApiUrl}/procedures/delete/${moreinfoid}`, {
  method: 'DELETE'
})
  .then(res => res.json())
  .then(data => {
    // Do some stuff...
    console.log(moreinfoid)
    console.log(data)
    Swal.fire(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    )
    props.history.push("/procedure");
  })
  .catch(err => console.log("hai",err));
      
      }
      else if(result.isDismissed){
        Swal.fire('Nothing is deleted', '', 'info')
      }
    })
  }

  const duplicate = (e) => {
    e.preventDefault();
    if (!experiment ){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Must Enter Experiment Name',
     
      })
    }
    else if (!labtype){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Must Enter Lab Name',
     
      })
    }
    else if (experiment && labtype){

    axios
      .post(`${ApiUrl}/procedures`, {
        title: experiment,
        html: editorRef.current.getContent(),
      })
      .then((res) => {
        console.log(res.data.content)
        if(res.data.result==="already exist"){
    
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'There is already a experiment in this name plz add you institute name to be specific',
         
          })
        }
        else {
          axios
          .post(`${ApiUrl}/moreInfo`, {
            experimentno: res.data.content,
            experiment:experiment,
            labtype: labtype,
            department: department,
            year: year,
            semester:semester,
            institute: institute,
            university:university
          })
          .then(() => {
            console.log("sent meta info");    
            // axios.post(`${ApiUrl}/labrotories`, {
            //   name: labRef.current.value,
            //   experiment: titleRef.current.value,
            // })
            Swal.fire(
              'success',
              'Procedure has been updated',
              'success',
            )
            setModalopen(false);
          })
          .catch((err) => {
            console.error(err)
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong Check your internet connection',
           
            })
        
          });
        }
    
    });


    }
    else {

    }
  };






  return (
    <div>
           <ArrowBackIcon
        onClick={goBack}
        style={{
          color: "red",
          border: "1px solid black",
          borderRadius: "50%",
          background: "white",
          zIndex: 100000,
          position: "absolute",
          top: 10,
          right: 30,
        }}
      />

        
      <Modal
      isOpen={modalopen}        
      style={customStyles}
      contentLabel="Education Level"
      appElement={document.getElementById('root')}
      disableBackdropClick="true"
      sx={{ overflow: 'hidden' }}
      
    >
      <div>
 
   <p style={{margin:0}}>Experiment</p>
      <TextField
      style={{marginBottom:'10px'}}
      size="small"
        placeholder="Experiment Title"
        value={experiment}
        onChange={(e)=>{setExperiment(e.target.value)}}
      /><br/>

       <p style={{margin:0}}>Lab Type</p>
      <TextField
      style={{marginBottom:'10px'}}
      size="small"
        placeholder="Lab Type"
        value={labtype}
        onChange={(e)=>{setLabtype(e.target.value)}}
      /><br/>
       <p style={{margin:0}}>Department</p>
      <TextField
      style={{marginBottom:'10px'}}
      size="small"
        placeholder="Department"
        value={department}
        onChange={(e)=>{setDepartment(e.target.value)}}
      /><br/>

<p style={{margin:0}}>Year</p>
<FormControl sx={{minWidth: 120 }} style={{marginBottom:'10px'}} size="small">
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={year}
        label="Year" 
        onChange={(e)=>{setYear(e.target.value)}}
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
      </Select>
    </FormControl><br/>

    <p style={{margin:0}}>Semester</p>
    <FormControl sx={{ minWidth: 120 }} style={{marginBottom:'10px'}} size="small">
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={semester}
        label="Semester" 
        onChange={(e)=>{setSemester(e.target.value)}}
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={6}>6</MenuItem>
        <MenuItem value={7}>7</MenuItem>
        <MenuItem value={8}>8</MenuItem>
      </Select>
    </FormControl><br/>


    <p style={{margin:0}}>Institute</p>
      <TextField
      style={{marginBottom:'10px'}}
      size="small"
        placeholder="Institute"
        value={institute}
        onChange={(e)=>{setInstitute(e.target.value)}}
      /><br/>

   <p style={{marginBottom:5}}>University</p>
      <TextField
      style={{marginBottom:'15px'}}
      size="small"
        placeholder="University"
        value={university}
        onChange={(e)=>{setUniversity(e.target.value)}}
      />






      <Grid 
    container
    direction="row"
    justifyContent="space-around"
    alignItems="center"  >
      <Grid item xs>
<Button variant='contained'
style={{ color: '#000000', backgroundColor: '#f1c232',margin:"10px" }}
onClick={handleSave}>
SAVE
 </Button>
      </Grid>
      <Grid item xs>
      <Button variant='contained'
style={{ color: '#000000', backgroundColor: '#f1c232',margin:"10px" }}
onClick={duplicate}>
Duplicate
 </Button>
 
      </Grid>

      <Grid item xs>
      <Button variant='contained'
style={{ color: '#000000', backgroundColor: '#f1c232',margin:"10px" }}
onClick={()=>{setModalopen(false)}}>
BACK
 </Button>
 
      </Grid>
    </Grid>




    <Button variant='contained'
style={{ color: '#000000', backgroundColor: 'red',marginLeft:"50%",marginRight:"50%" }}
onClick={()=>{deleteexperiment()}}>
Delete
 </Button>




   </div>
    </Modal>
{initialcontent ?
    <div>
         <Button variant="contained" style={{ backgroundColor:"#F1C232",color:"black",float:"right"}} onClick={showmodal}>
          SHOW
         </Button>
         <br/><br/>
     
        <Editor
          id="myTiny_Mce"
          initialValue={initialcontent}
          apiKey="au50u78j9vjabzcr4icg4v3oknubu08ifv9rfstawlzmdobp"
          init={{
            height: "100vh",
            menubar: true,
            selector: "textarea",
            external_plugins: {
              tiny_mce_wiris: `${path.join(
                __dirname,
                "../../../../node_modules/@wiris/mathtype-tinymce5/plugin.min.js"
              )}`,
            },
            plugins: [
              "advlist autolink lists link image code textpattern template",
              "charmap print preview anchor help",
              "searchreplace visualblocks code",
              "insertdatetime media table advtablesort paste wordcount save",
            ],
            toolbar: `undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help | image code table customInsertButton customDateButton template tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry`,
            image_advtab: true,
            image_title: true,
            automatic_uploads: true,
            file_picker_types: "image",
            file_picker_callback: function (cb, value, meta) {
              var input = document.createElement("input");
              input.setAttribute("type", "file");
              input.setAttribute("accept", "image/*");
              input.onchange = function () {
                var file = this.files[0];

                var reader = new FileReader();
                reader.onload = function () {
                  var id = "blobid" + new Date().getTime();
                  var blobCache =
                    window.tinymce.activeEditor.editorUpload.blobCache;
                  var base64 = reader.result.split(",")[1];
                  var blobInfo = blobCache.create(id, file, base64);
                  blobCache.add(blobInfo);
                  cb(blobInfo.blobUri(), { title: file.name });
                };
                reader.readAsDataURL(file);
              };

              input.click();
            },
            setup: function (editor) {
              editor.ui.registry.addButton("customInsertButton", {
                icon: "edit-block",
                tooltip: "Insert Input Element",
                onAction: function (_) {
                  const value = nanoid(7);
                  editor.insertContent(
                    `&nbsp;<input type='text' id='value_${value}' name='value_${value}'>&nbsp;`
                  );
                },
              });

              var toTimeHtml = function (date) {
                return (
                  '<time datetime="' +
                  date.toString() +
                  '">' +
                  date.toDateString() +
                  "</time>"
                );
              };

              editor.ui.registry.addButton("customDateButton", {
                icon: "insert-time",
                tooltip: "Insert Current Date",
                disabled: true,
                onAction: function (_) {
                  editor.insertContent(toTimeHtml(new Date()));
                },
                onSetup: function (buttonApi) {
                  var editorEventCallback = function (eventApi) {
                    buttonApi.setDisabled(
                      eventApi.element.nodeName.toLowerCase() === "time"
                    );
                  };
                  editor.on("NodeChange", editorEventCallback);

                  /* onSetup should always return the unbind handlers */
                  return function (buttonApi) {
                    editor.off("NodeChange", editorEventCallback);
                  };
                },
              });
            },
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
          onInit={(evt,editor)=>editorRef.current=editor}
        />

</div>
:
<Backdrop
sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
open={true}
// onClick={handleClose}
>
<CircularProgress color="inherit" />
</Backdrop>
   
        }
    </div>
  )
}

export default Editprocedure