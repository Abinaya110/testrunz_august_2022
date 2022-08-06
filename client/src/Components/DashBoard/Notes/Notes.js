import React,{useState} from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ApiUrl from "../../../ServerApi";
import Button from "@material-ui/core/Button";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const Notes = ({ data }) => {
  const [dataV, setDataV] = React.useState("");
  const [backdropstatus,setBackdropstatus]=useState(false)
  const [statusmessages, setStatusmessages] = React.useState("")
  const [opens, setOpens] = React.useState(false);
  const vertical ="button"
  const horizontal = "center"

  React.useEffect(() => {
    async function fetchData() {
      await axios
        .get(`${ApiUrl}/notes/${data.runID}`, { headers: {} })
        .then((res) => {
          setDataV(res.data.notes)
          setBackdropstatus(true)
      
        });
    }

    if (data.runID) fetchData();
  }, [data.runID]);

  const handleCloses = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpens(false);
   
  };



  const saving = async () => {



    fetch(`${ApiUrl}/notes/${data.runID}`, {
      method: 'PATCH',
      body: JSON.stringify({
        notes: dataV,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        setOpens(true);
            setStatusmessages('Note has been Saved')
      });










  };
  //console.log(dataV);
  return (
    <>
    {backdropstatus  ?
    <div>
  
    <Button variant="contained" style={{ backgroundColor:"#F1C232",color:"black" }} onClick={saving}>Save</Button>
      <br/>
      <br/>
      <br/>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={dataV.replace(/['"]+/g, "")}
        onChange={setDataV}
      />


      <Snackbar open={opens} autoHideDuration={3000} onClose={handleCloses} anchorOrigin={{ vertical, horizontal }}>
        <Alert onClose={handleCloses} severity="success" sx={{ width: '100%' }}>
          {statusmessages}
        </Alert>
      </Snackbar>



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
    </>
  );
};

export default Notes;
