import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Swal from "sweetalert2";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Button from "@mui/material/Button";
import { useStateValue } from "../../../../data/StateProvider";
import ApiUrl from "../../../../ServerApi";
import axios from "axios";

const Input = styled("input")({
  display: "none",
});

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  // const[rating,setRating]=useState(0)
  const [baseImage, setBaseImage] = useState("");
  const [type, setType] = useState("");

  const [{ user }] = useStateValue();

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const sendfeedback = (e) => {
    e.preventDefault();
    if (!type) {
      alert("Select the Category");
    } else if (!feedback) {
      alert("Write some Feedback");
    } else {
      axios
        .post(`${ApiUrl}/feedback`, {
          postedby: user.email,
          type: type,
          feedback: feedback,
          image: baseImage,
        })
        .then((res) => {
          // console.log("feedback sent");
          setBaseImage("");
          setFeedback("");
          setType("");
          Swal.fire("Success", "Your feedback has been Submitted", "success");
        })
        // .catch((err) => {
        //   console.log(err);
        // });

      // console.log(rating)
      // console.log(feedback)
      // console.log(user)

      setFeedback("");
      // setRating(0)
      setType("");
    }
  };
  return (
    <Card>
      <CardContent style={{ backgroundColor: "#E5E4E2" }}>
        <p>
          <span style={{ fontWeight: "bold" }}>Send us some feedback!</span>
          &nbsp;&nbsp;&nbsp;
          <br />
          <span style={{ color: "#595958" }}>
            "Let us know what we're getting right and what we can improve"
          </span>
          {/* <span style={{ color: "#595958" }}>
            "Do yoy have a suggestion or found some bug? Let us know in the field below."
          </span> */}
        </p>
        {/* <br />   */}
        <FormControl>
          <FormLabel
            id="demo-radio-buttons-group-label"
            style={{ fontWeight: "bold" }}
          >
            Category
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <FormControlLabel value="bug" control={<Radio />} label="Bug" />
            <FormControlLabel
              value="feature"
              control={<Radio />}
              label="Features"
            />
            <FormControlLabel
              value="others"
              control={<Radio />}
              label="Others"
            />
          </RadioGroup>
        </FormControl>
        <br />
        <br />
        <TextareaAutosize
          aria-label="minimum height"
          minRows={6}
          placeholder="Write your feedback..."
          // placeholder="Describe your issue or idea..."
          style={{ width: 500 }}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <br /> <br />
        {/* <Grid container spacing={2}>
   <Grid item>
  <p><span style={{fontWeight:"bold"}}>Rate Us : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span ></p>

  </Grid> 
  <Grid item >
  <Rating name="half-rating" value={rating} onChange={(e)=>setRating(e.target.value)} precision={0.5} />

  </Grid>
  </Grid>*/}
        <img src={baseImage} height="200px" />
        <br />
        <br />
        <label htmlFor="contained-button-file">
          <Input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            onChange={(e) => {
              uploadImage(e);
            }}
          />
          <Button
            variant="contained"
            style={{ backgroundColor: "#F1C232", color: "black" }}
            component="span"
          >
            Upload
          </Button>
        </label>
        <br /> <br />
        <Button
          variant="contained"
          style={{ backgroundColor: "#F1C232", color: "black" }}
          onClick={sendfeedback}
        >
          Submit
        </Button>
      </CardContent>
    </Card>
  );
};

export default Feedback;
