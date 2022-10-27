import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import ApiUrl from "../../../ServerApi";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState();
  const [status, setStatus] = useState();
  useEffect(() => {
    fetch(`${ApiUrl}/feedback`)
      .then((response) => response.json())
      .then((data) => {
        setFeedbacks(data);
      });
  }, []);
  return (
    <div>
      <div>Admin Feedback section</div>
      {feedbacks ? (
        <>
          {feedbacks.map((feedback) => (
            <div>
              <Card key={feedback._id}>
                <CardContent>
                  <div>Feedback: {feedback.feedback}</div>
                  <div>Status: {feedback.status}</div>
                  <div>
                    Assigned to:{" "}
                    {feedback.assignedto
                      ? feedback.assignedto
                      : "Not yet assigned"}
                  </div>
                </CardContent>
                <CardActions>
                  <Grid container spacing={2}>
                    <div style={{ margin: "20px" }}>
                      <Button
                        style={{ backgroundColor: "#F1C232", color: "black" }}
                      >
                        {" "}
                        Assign{" "}
                      </Button>
                    </div>
                    <div style={{ margin: "20px" }}>
                      <Select
                        size="small"
                        style={{ width: "200px" }}
                        value={status}
                        label="status"
                        onChange={(e) => {
                          setStatus(e.target.value);
                        }}
                      >
                        <MenuItem value={"error"}>Error</MenuItem>
                        <MenuItem value={"closed"}>Closed</MenuItem>
                        <MenuItem value={"devclosed"}>Dev closed</MenuItem>
                        <MenuItem value={"testclosed"}>Test closed</MenuItem>
                      </Select>
                    </div>

                    <div style={{ margin: "20px" }}>
                      <Button
                        style={{ backgroundColor: "#F1C232", color: "black" }}
                      >
                        Update Status
                      </Button>
                    </div>
                  </Grid>
                </CardActions>
              </Card>
              <br />
            </div>
          ))}
        </>
      ) : (
        <p>loading ....</p>
      )}
    </div>
  );
};

export default AdminFeedback;
