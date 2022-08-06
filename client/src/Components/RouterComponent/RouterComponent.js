import React, { useState, useEffect ,useLayoutEffect} from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Home from "../../Home";
import ListUserComponent from "./user/ListUserComponent";
import AddUserComponent from "./user/AddUserComponent";

import UserDashComponent from "../DashBoard/DashBoard";
import ShatedDashComponent from "../DashBoard/Dashboardshared";
import ListProcedure from "./user/Procedure/ProcedureList";
import AddProcedure from "./user/Procedure/Procedure";
import EditProcedure from "./user/Procedure/Editprocedure";
import Procedurelist from "./user/Procedure/ProcedureList";

// import ListProcedureschool from "./user/Procedureschool/ProcedureList";
// import AddProcedureschool from "./user/Procedureschool/Procedure";
// import EditProcedureschool from "./user/Procedureschool/ProcedureEdit";
// import Procedurelistschool from "./user/Procedureschool/ProcedureList";

import AdminFeedback from "./user/AdminFeedback"
import Signup from "../../authent/Signup";
import Signin from "../../authent/Signin";
import Forgot from "../../authent/forgot";
// import Adduser from "./user/Adduser/Adduser";
// import Manageindividualuser from "./user/Settingstab/Manage/Manageindividualuser";
// import Manageindividual2 from "./user/Settingstab/Manage/Manageindividual2";
import Sidelayout from "./user/Sidelayout"
import Private from "../../core/Private";

import { useCookies } from "react-cookie";
import PrivateRoute from "../../authent/PrivateRoute";
import AdminRoute from "../../authent/AdminRoute";
import PersonalRoute from "../../authent/PersonalRoute";
import Google1 from "../../authent/Google1";
import Runz from "./user/Runz";
import Mypage from "./user/Mypage";

import User from "./user/User";
import Settings from "./user/Settings";
import Support from "./user/Support";
import { useStateValue } from "../../data/StateProvider";
import { actionTypes } from "../../data/reducer";
import Inventory from "./user/Inventory/Inventory";
import Lablist from "./user/Lablist";
import Assignedlist from "./user/Assignedlist";
import Landingpage from "./user/Landingpage/Landingpage";
import NewProcedure from "./user/Procedure/NewProcedure";

const RouterComponent = (props) => {
  const [{ user }, dispatch] = useStateValue();
 
  const [cookies, setCookie, removeCookie] = useCookies(["userjwt"]);













  return (
    
    <div>
        <Router>
          
        <Sidelayout>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/landingpage" exact component={Landingpage} />
            <Route path="/signup" exact component={Signup} />
            {/* <Route path="/signin" exact component={Signin} /> */}
            <Route path="/signin" exact component={Signin} />
            <Route path="/Google1" exact component={Google1} /> 
            <Route path="/forgot_password" component={Forgot} />
            <PersonalRoute path="/private" exact component={Private}  auth={props.user}/>
            <PrivateRoute path="/runz" exact component={Runz} auth={props.user} /> 
            <PrivateRoute path="/app" exact component={Mypage} auth={props.user}/> 
            <PrivateRoute path="/procedure" exact component={Procedurelist} auth={props.user}/> 
            <PrivateRoute path="/profile" exact component={User} auth={props.user}/> 
            <PrivateRoute path="/settings" exact component={Settings} auth={props.user}/> 
            <PrivateRoute path="/support" exact component={Support} auth={props.user}/> 
            <PrivateRoute path="/add-user" exact component={AddUserComponent} auth={props.user}/>
            {/* <PrivateRoute path="/adduser" exact component={Adduser} auth={props.user}/>
            <PrivateRoute path="/inventory" exact component={Inventory} auth={props.user}/> */}
            <PrivateRoute path="/app/:id" exact component={Lablist} auth={props.user}/>
            <PrivateRoute path="/app/:id/:exp" exact component={Assignedlist} auth={props.user}/>

            {/* <PrivateRoute
              path="/adminfeedback"
              exact
              component={AdminFeedback}
            /> */}

 
            <PrivateRoute
              path="/userdash/:token"
              component={UserDashComponent}
              auth={props.user}
            />
            <PrivateRoute
              path="/shareddash/:token"
              component={ShatedDashComponent}
              auth={props.user}
            />
            <PrivateRoute path="/listProce" exact component={ListProcedure} auth={props.user}/>
            {/* <AdminRoute path="/addProce" exact component={AddProcedure} auth={props.user}/> */}
            <AdminRoute path="/addProce" exact component={NewProcedure} auth={props.user}/>

        

            <AdminRoute
              path="/editProce/:id"
              exact
              component={EditProcedure}
            />
              {/* <PrivateRoute
              path="/manageuser/:token"
              exact
              component={Manageindividualuser}
            /> */}
            {/* <AdminRoute
              path="/manageuseradmin/:token"
              exact
              component={Manageindividual2}
            /> */}
          </Switch>
          </Sidelayout>
        </Router>
    </div>
  );
};

export default RouterComponent;