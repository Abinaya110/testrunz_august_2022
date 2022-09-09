import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Badge from "@mui/material/Badge";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
      zIndex: "500%",
      padding: "1%",
      height: "40%",
    },
  },
}));

const formContainer = {
  display: "flex",
  flexFlow: "column wrap",
  alignContent: "space-between",
  zIndex: "100%",
};

export default function NotificationRunz(props) {
  const classes = useStyles();
  let datas = props.users;
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [array, setArray] = useState();
  const history = useHistory()
  const handleMenuItemClick = (event, index) => {
    // setSelectedIndex(index);
    history.push(`/userdash/${index._id}`);
    setOpen(false);
    console.log("noti",index)
    // playUser(data.ProcedureId)
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {
    setArray(
      datas.filter(function (data) {
        return data.status == "Created";
      })
    );

    console.log("from n r p", array);
    console.log("from n r p", datas);
  }, []);
  return (
    <div className={classes.root}>
      <form style={formContainer}>
        {array ? (
          <React.Fragment>

         
                <ButtonGroup ref={anchorRef} >
            <div >
                  <Button
                    style={{
                    //   backgroundColor: "#F1C232",
                    //   padding: "5px",
                    //   borderRadius: "5px",
                    //   borderWidth: "0.5px",
                    //   borderColor: "gray",
                    //   color: "black",
                    //   overflow: "hidden",
                    //   zIndex: "500%",
                    textAlign:"right",
                    color: "#F1C232",
                    border:"none",
                    margin:"10px"
                    }}
                    aria-controls={open ? "split-button-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="menu"
                    onClick={handleToggle}
                  >
                    <Badge
                      style={{ zIndex: 0 }}
                      badgeContent={array.length}
                      color="error"
                    >
                      <CommentOutlinedIcon  sx={{ fontSize: 25 }}/>
                      {console.log(array.length)}
                    </Badge>
                  </Button>
                </div>
                </ButtonGroup>
            <Popper
              sx={{
                zIndex: "1",
              }}
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
            //   disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper sx={{ overflow: "hidden" }}>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        sx={{ overflow: "hidden", zIndex: "500%" }}
                        id="split-button-menu"
                        autoFocusItem
                      >
                        {array.map((option) => (
                          <MenuItem
                            sx={{ overflow: "hidden" }}
                            key={option._id}
                            onClick={(event,index) => handleMenuItemClick(event,option)}
                          >
                            {option.experimentName}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </React.Fragment>
        ) : null}
      </form>
    </div>
  );
}
