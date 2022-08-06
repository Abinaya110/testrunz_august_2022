import { Grid } from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect, useState } from "react";
import ApiUrl from "../../../../../ServerApi";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../../../../../data/StateProvider";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Box from "@mui/material/Box";
import { Button } from "@material-ui/core";
// import Modal from '@mui/material/Modal';
import { BiEditAlt } from "react-icons/bi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  overflowY: "scroll",
  p: 4,
};

const ManageModal = (props) => {
  const [{ user }, dispatch] = useStateValue();
  let row = [];
  const USER_API_BASE_URL = `${ApiUrl}/api/alluser`;
  const [userlist, setUserlist] = useState();
  const [loadingscreen, setLoadingscreen] = useState(true);
  const [update, setUpdate] = useState(true);
  const [editrole, setEditrole] = useState(true);
  const [edituniversity, setEdituniversity] = useState(true);
  const [editinstitutename, setEditinstitutename] = useState(true);
  const [editcountry, setEditcountry] = useState(true);
  const [editdepartment, setEditdepartment] = useState(true);
  const [editstate, setEditstate] = useState(true);
  const [edityear, setEdityear] = useState(true);
  const [editsemester, setEditsemester] = useState(true);
  const [modalOpenAdd, setModalOpenAdd] = useState(false);
  const [editlabtype, setEditlabtype] = useState(true);
  const [lab, setLab] = useState();
  const [role, setRole] = useState();
  const [university, setUniversity] = useState();
  const [institute, setInstitute] = useState();
  const [options1, setOptions1] = useState();
  const [options2, setOptions2] = useState();
  const [country, setCountry] = useState();
  const [lablist, setLablist] = useState();
  const [year, setYear] = useState();
  const [department, setDepartment] = useState();
  const [semester, setSemester] = useState();
  const [state, setState] = useState();
  const [newlab, setNewlab] = useState();
  const history = useHistory();

  const columns = [
    { title: "ID", field: "_id", editable: "never" },
    { title: "Name", field: "name", editable: "never" },
    { title: "Email", field: "email", editable: "never" },
    {
      title: "Role",
      field: "role",
      lookup: {
        superadmin: "Super Admin",
        admin: "Admin",
        teacher: "Teacher",
        student: "Student",
      },
    },
    { title: "Country", field: "country", editable: "never" },
    { title: "Institute Name", field: "instituteName", editable: "never" },
  ];

  const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditlabtype(true);
    setEditrole(true);
    setEditinstitutename(true);
    setEditcountry(true);
    setEditdepartment(true);
    setEditstate(true);
    setEdityear(true);
    setEditsemester(true);
    setEditlabtype(true);
  };

  const [detail, setDetail] = useState();

  useEffect(() => {
    console.log("new console", props.useridnum);
    fetch(`${ApiUrl}/api/users/${props.useridnum}`)
      .then((res) => res.json())
      .then((data) => {
        setDetail(data);
        setLab(data.labtype);
        setRole(data.role);
        setInstitute(data.institute);
        setCountry(data.country);
        setYear(data.year);
        setSemester(data.semester);
        setState(data.state);
      });
  }, []);

  /// fetch lab

  const fetchlab = () => {
    const fetchlbs = () => {
      fetch(`${ApiUrl}/moreInfo/labs/depandclg`, {
        method: "POST",
        body: JSON.stringify({
          department: detail.department,
          institute: detail.instituteName,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          // setOptions2(json.ids)
          console.log("json hekk  kkkp");
          setLablist(json.ids);
          console.log(json);
          console.log(typeof user.role);
        });
    };

    if (user.role == "superadmin") {
      fetchlbs();
    } else {
      console.log("list user");
      setLablist(user.labtype);
    }
  };

  /// department fetch
  const fetchdepartment = (institute) => {
    console.log(institute);
    fetch(`${ApiUrl}/moreInfo/department`, {
      method: "POST",

      body: JSON.stringify({
        institute: institute,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setOptions2(json.ids);

        console.log(json);
      });
  };

  /// institute fetch
  const fetchinstitute = (university) => {
    setUniversity(university);
    setInstitute("");
    setDepartment("");

    fetch(`${ApiUrl}/moreInfo/respectiveinstitute`, {
      method: "POST",

      body: JSON.stringify({
        university: university,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setOptions1(json.ids);
        console.log(json);
      });
  };


  /// university fetch
  const fetchuniversity = () => {
    fetch(`${ApiUrl}/moreInfo/all/university`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOptions1(data.ids);
      });
  };

  /// filter lab
  const filter = (labname) => {
    let templab = [...lab].filter((lab1) => lab1 !== labname);
    setLab(templab);
  };

  const patchsingle = (tag, value, id) => {
    fetch(`${ApiUrl}/api/tooglelab/admin`, {
      method: "PATCH",
      body: JSON.stringify({
        [tag]: value,
        id: id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        alert("User updated successfully");
        console.log(json);
        setUpdate(!update);
      });
  };

  // const edituser = async (userId) => {
  //   setOpen(true)
  //   fetch(`${ApiUrl}/api/users/${userId}`)
  //   .then((res)=>res.json())
  //   .then(data =>{
  //     setDetail(data)
  //     setLab(data.labtype)
  //     setRole(data.role)
  //     setInstitute(data.institute)
  //     setCountry(data.country)
  //     setYear(data.year)
  //     setSemester(data.semester)
  //     setState(data.state)

  //   })

  // };
  // const edituseradmin = async (userId) => {
  //   // history.push(`/manageuseradmin/${userId}`);
  //   setOpen(true)
  //   fetch(`${ApiUrl}/api/users/${userId}`)
  //   .then((res)=>res.json())
  //   .then(data =>{
  //     setDetail(data)
  //     setRole(data.role)
  //     setInstitute(data.institute)
  //     setCountry(data.country)
  //     setYear(data.year)
  //     setSemester(data.semester)
  //     setState(data.state)
  //     setLab(data.labtype)

  //   })
  // };

  // content for Manage User modal
  const openModal = () => setModalOpenAdd(() => true);
  const closeModal = () => setModalOpenAdd(() => false);

  return (
    <div>
      <Box sx={style}>
        {detail ? (
          <>
            {/* {detail.name} <Link>edit <ModeEditIcon fontSize="small"/></Link> */}

            <div style={{ display: "flex" }}>
              <div style={{ flexGrow: 1 }}>
                <strong>
                  <em>Manage User</em>
                </strong>
              </div>

              <div>
                <Button color="secondary" button onClick={props.closeeditModal}>
                  Close
                </Button>
              </div>
            </div>
            <br />
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={5}>Name</Grid>
              <Grid item xs={6}>{detail.name}</Grid>
              <Grid item xs={1}>
                <Button disabled>
                  <BiEditAlt />
                </Button>
              </Grid>
            </Grid>
            <br />

            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={5}>Email</Grid>
              <Grid item xs={6}>{detail.email}</Grid>
              <Grid item xs={1}>
                <Button disabled>
                  <BiEditAlt />
                </Button>{" "}
              </Grid>
            </Grid>
            <br />

            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={5}>Role</Grid>
              <Grid item xs={6}>
                {editrole ? (
                  detail.role
                ) : (
                  <>
                    {user.role == "superadmin" ? (
                      <Select
                        labelId="demo-simple-select-disabled-label"
                        id="demo-simple-select-disabled"
                        value={role}
                        label="Role"
                        size="small"
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <MenuItem value={"superadmin"}>Super Admin</MenuItem>
                        <MenuItem value={"admin"}>Admin</MenuItem>
                        <MenuItem value={"teacher"}>Teacher</MenuItem>
                        <MenuItem value={"student"}>Student</MenuItem>
                      </Select>
                    ) : null}
                    {user.role == "admin" ? (
                      <Select
                        labelId="demo-simple-select-disabled-label"
                        id="demo-simple-select-disabled"
                        value={role}
                        label="Role"
                        size="small"
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <MenuItem value={"teacher"}>Teacher</MenuItem>
                        <MenuItem value={"student"}>Student</MenuItem>
                      </Select>
                    ) : null}

                    {user.role === "teacher" || user.role === "student" ? (
                      <Select
                        labelId="demo-simple-select-disabled-label"
                        id="demo-simple-select-disabled"
                        value={role}
                        label="Role"
                        size="small"
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <MenuItem value={"student"}>Student</MenuItem>
                      </Select>
                    ) : null}

                    <Button
                      onClick={(e) => {
                        patchsingle("role", role, detail._id);
                        setEditrole(!editrole);
                      }}
                    >
                      Update
                    </Button>
                  </>
                )}
              </Grid>
              <Grid item xs={1}>
                <Button onClick={() => setEditrole(!editrole)}>
                  {editrole ? (
                    <>
                      <BiEditAlt />
                    </>
                  ) : (
                    <>Cancel</>
                  )}
                </Button>
              </Grid>
            </Grid>
            <br />

            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={5}>University</Grid>
              <Grid item xs={6}>
                {edituniversity ? (
                  detail.university
                ) : (
                  <>
                    {options1 ? (
                      <>
                        <Autocomplete
                          id="outlined-basic"
                          variant="outlined"
                          size="small"
                          value={university}
                          onChange={(event, newValue) => {
                            setUniversity(newValue);
                          }}
                          options={options1.map((option) => option)}
                          sx={{ width: 300 }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                        <Button
                          onClick={(e) => {
                            patchsingle("university", university, detail._id);
                            setEdituniversity(!edituniversity);
                          }}
                        >
                          Update
                        </Button>
                      </>
                    ) : null}
                  </>
                )}
              </Grid>
              <Grid item xs={1}>
                {user.role == "superadmin" ? (
                  <Button
                    onClick={() => {
                      setEdituniversity(!edituniversity);
                      fetchuniversity();
                    }}
                  >
                    {edituniversity ? (
                      <>
                        <BiEditAlt />
                      </>
                    ) : (
                      <>Cancel</>
                    )}
                  </Button>
                ) : (
                  <Button disabled>
                    <BiEditAlt />
                  </Button>
                )}
              </Grid>
            </Grid>
            <br />

            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={5}>Institute Name</Grid>
              <Grid item xs={6}>
                {editinstitutename ? (
                  detail.instituteName
                ) : (
                  <>
                    {options1 ? (
                      <>
                        <Autocomplete
                          id="outlined-basic"
                          variant="outlined"
                          size="small"
                          value={institute}
                          onChange={(event, newValue) => {
                            setInstitute(newValue);
                          }}
                          options={options1.map((option) => option)}
                          sx={{ width: 300 }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                        <Button
                          onClick={(e) => {
                            patchsingle("instituteName", institute, detail._id);
                            setEditinstitutename(!editinstitutename);
                          }}
                        >
                          Update
                        </Button>
                      </>
                    ) : null}
                  </>
                )}
              </Grid>
              <Grid item xs={1}>
                {user.role == "superadmin" ? (
                  <Button
                    onClick={() => {
                      setEditinstitutename(!editinstitutename);
                      fetchinstitute(detail.university);
                    }}
                  >
                    {editinstitutename ? (
                      <>
                        <BiEditAlt />
                      </>
                    ) : (
                      <>Cancel</>
                    )}
                  </Button>
                ) : (
                  <Button disabled>
                    <BiEditAlt />
                  </Button>
                )}
              </Grid>
            </Grid>
            <br />

            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={5}>Department</Grid>
              <Grid item xs={6}>
                {editdepartment ? (
                  detail.department
                ) : (
                  <>
                    {options2 ? (
                      <>
                        <Autocomplete
                          id="outlined-basic"
                          variant="outlined"
                          size="small"
                          value={department}
                          onChange={(event, newValue) => {
                            setDepartment(newValue);
                          }}
                          options={options2.map((option) => option)}
                          sx={{ width: 300 }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                        <Button
                          onClick={(e) => {
                            patchsingle("department", department, detail._id);
                            setEditdepartment(!editdepartment);
                          }}
                        >
                          Update
                        </Button>
                      </>
                    ) : null}
                  </>
                )}{" "}
              </Grid>
              <Grid item xs={1}>
                {user.role == "superadmin" ? (
                  <Button
                    onClick={() => {
                      setEditdepartment(!editdepartment);
                      fetchdepartment(detail.instituteName);
                    }}
                  >
                    {editdepartment ? (
                      <>
                        <BiEditAlt />
                      </>
                    ) : (
                      <>Cancel</>
                    )}
                  </Button>
                ) : (
                  <Button disabled>
                    <BiEditAlt />
                  </Button>
                )}
              </Grid>
            </Grid>
            <br />

            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={5}>Country</Grid>
              <Grid item xs={6}>
                {editcountry ? (
                  detail.country
                ) : (
                  <>
                    <input
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    ></input>
                    <Button
                      onClick={() => {
                        patchsingle("country", country, detail._id);
                        setEditcountry(!editcountry);
                      }}
                    >
                      Update
                    </Button>
                  </>
                )}
              </Grid>
              <Grid item xs={1}>
                <Button onClick={() => setEditcountry(!editcountry)}>
                  {editcountry ? (
                    <>
                      <BiEditAlt />
                    </>
                  ) : (
                    <>Cancel</>
                  )}
                </Button>
              </Grid>
            </Grid>
            <br />

            {detail.role == "student" ? (
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item xs={5}>Year</Grid>
                <Grid item xs={6}>
                  {edityear ? (
                    detail.year
                  ) : (
                    <>
                      <Select
                        labelId="demo-simple-select-disabled-label"
                        id="demo-simple-select-disabled"
                        value={year}
                        size="small"
                        onChange={(e) => setYear(e.target.value)}
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                      </Select>
                      <Button
                        onClick={() => {
                          patchsingle("year", year, detail._id);
                          setEdityear(!edityear);
                        }}
                      >
                        Update
                      </Button>
                    </>
                  )}
                </Grid>
                <Grid item xs={1}>
                  <Button onClick={() => setEdityear(!edityear)}>
                    {edityear ? (
                      <>
                        <BiEditAlt />
                      </>
                    ) : (
                      <>Cancel</>
                    )}
                  </Button>
                </Grid>
              </Grid>
            ) : null}
            <br />

            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={5}>State</Grid>
              <Grid item xs={6}>
                {editstate ? (
                  detail.state
                ) : (
                  <>
                    <input
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    ></input>
                    <Button
                      onClick={(e) => {
                        patchsingle("state", state, detail._id);
                        setEditstate(!editstate);
                      }}
                    >
                      Update
                    </Button>
                  </>
                )}{" "}
              </Grid>
              <Grid item xs={1}>
                <Button onClick={() => setEditstate(!editstate)}>
                  {editstate ? (
                    <>
                      <BiEditAlt />
                    </>
                  ) : (
                    <>Cancel</>
                  )}
                </Button>
              </Grid>
            </Grid>
            <br />

            {detail.role == "student" ? (
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item xs={5}>Semester</Grid>
                <Grid item xs={6}>
                  {editsemester ? (
                    detail.semester
                  ) : (
                    <>
                      <Select
                        labelId="demo-simple-select-disabled-label"
                        id="demo-simple-select-disabled"
                        value={semester}
                        size="small"
                        onChange={(e) => setSemester(e.target.value)}
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
                      <Button
                        onClick={() => {
                          patchsingle("semester", semester, detail._id);
                          setEditsemester(!editsemester);
                        }}
                      >
                        Update
                      </Button>
                    </>
                  )}{" "}
                </Grid>
                <Grid item xs={1}>
                  <Button onClick={() => setEditsemester(!editsemester)}>
                    {editsemester ? (
                      <>
                        <BiEditAlt />
                      </>
                    ) : (
                      <>Cancel</>
                    )}
                  </Button>
                </Grid>
              </Grid>
            ) : null}
            <br />

            {detail.labtype ? (
              <>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item xs={5}>List of labs available</Grid>
                  <Grid item xs={6}>
                    {editlabtype ? null : lablist ? (
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <Grid item>
                          <Autocomplete
                            size="small"
                            onChange={(event, newValue) => {
                              setNewlab(newValue);
                            }}
                            options={lablist.map((option) => option)}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Grid>
                        <Grid item>
                          <Button
                            onClick={() => {
                              let temp = [...lab, newlab];
                              var uniqueemail = [...new Set(temp)];
                              var sendlab = uniqueemail.filter(function (e) {
                                return e != null;
                              });
                              patchsingle("labtype", sendlab, detail._id);
                              setEditlabtype(!editlabtype);
                            }}
                          >
                            Update
                          </Button>
                        </Grid>
                      </Grid>
                    ) : null}{" "}
                  </Grid>
                  <Grid item xs={1}>
                    <Button
                      onClick={() => {
                        setEditlabtype(!editlabtype);
                        fetchlab();
                      }}
                    >
                      {editlabtype ? (
                        <>
                          <BiEditAlt />
                        </>
                      ) : (
                        <>Cancel</>
                      )}
                    </Button>
                  </Grid>
                </Grid>
                <br />

                {/* {editlabtype?null:
    
    lablist?
    <Grid
  container
  direction="row"
  justifyContent="flex-start"
  alignItems="center"
>
<Grid item>
  <Autocomplete
      size="small"
      onChange={(event, newValue) => {
        setNewlab(newValue)
      }}
      options={(lablist).map((option) => option)}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params}  />}
    />
    </Grid>
    <Grid item>
    <Button onClick={()=>{
      let temp = [...lab,newlab]
      var sendlab = temp.filter(function (e) {return e != null;});
      patchsingle("labtype",sendlab,detail._id);
      setEditlabtype(!editlabtype)
    }
      }>Update</Button>
      </Grid>
      </Grid>
      :null
} */}
                <br />
                {lab
                  ? lab.map((lab) => (
                      <>
                        <li key={lab}>
                          <span>{lab}</span>
                          &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                          {editlabtype ? null : (
                            <DeleteOutlineIcon
                              color="error"
                              onClick={() => filter(lab)}
                            />
                          )}
                        </li>
                        <br />
                      </>
                    ))
                  : null}
                <br />
              </>
            ) : null}
          </>
        ) : (
          <>Loading...</>
        )}
      </Box>
    </div>
  );
};

export default ManageModal;