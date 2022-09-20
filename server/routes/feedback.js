const express = require("express");
const router = express.Router();

const {
  getAll,
  postFeedback,
  postQuery
  
} = require("../controllers/feedbackController");


 router.get("/", getAll);

// router.get("/:runID", getById);

router.post("/", postFeedback);

router.post("/query", postQuery);

// router.patch("/:runID", patchNotes);

// router.delete("/:runID", deleteNotes);

// commented routs is optional controller has to be written 

module.exports = router;