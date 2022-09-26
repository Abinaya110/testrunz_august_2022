const express = require("express");
const router = express.Router();
const {
  postInfo,
  patchById,
  getById,
  getInfo,
  getLabs,
  getDepartment,
  getInstitute,
  getExplist,
  getLabsfromdepartment,
  getSelectedExplist,
  getUniversity,
  getRespectiveInstitute
  
} = require("../controllers/moreInfoController");

const {
  getDepartmentandmemberdetails,
  getlabdetail,
  getlabdetailadmin
} = require("../controllers/detailsController");

router.post("/", postInfo);

router.patch("/edit", patchById);

router.get("/:_id", getById);

router.get("/", getInfo);

router.get("/all/institute", getInstitute);

router.post("/respectiveinstitute", getRespectiveInstitute);


router.get("/all/university", getUniversity);

router.post("/department", getDepartment);

router.post("/labs", getLabs);

router.post("/experiment",getExplist)

router.post("/labs/depandclg",getLabsfromdepartment)

router.post("/selected",getSelectedExplist)

router.post("/getdetail/university/institute",getDepartmentandmemberdetails)
router.post("/getdetail/university/institute/department",getlabdetail)
router.post("/getdetail/university/institute/department/admin",getlabdetailadmin)

module.exports = router;
