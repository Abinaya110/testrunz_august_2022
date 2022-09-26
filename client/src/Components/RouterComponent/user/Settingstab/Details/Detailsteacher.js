import { Button, Card } from '@material-ui/core'
import React,{useEffect, useState} from 'react'
import ApiUrl from '../../../../../ServerApi'
import { useStateValue } from '../../../../../data/StateProvider' 
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useHistory, Link } from "react-router-dom";
import { Box, Paper } from '@mui/material';
import Modal from "react-modal";
import MaterialTable from 'material-table';

const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    width: "30%",
    height: "auto",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -40%)",
    borderRadius: "2%",
  },
};


const Detailsteacher = () => {
    const [{ user }, dispatch] = useStateValue();
    const [modalOpen, setModalOpen] = useState(false);
     const[details,setDetails]=useState()
    const instituteName= user.instituteName
    const university=user.university
    const department=user.department
    const [lablist,setLablist]=useState()
    const [users, setUsers] = useState([]);
    let rows=[]
    const columns1 = [
        { title: "Id", field: "id" ,width:"25%" },
        { title: "Students Name", field: "Name" ,width:"25%" },
        { title: "Email Id", field: "Email" ,width:"25%" },
   
      ];
    useEffect(() => {
        console.log(user)
            fetch(`${ApiUrl}/api/getaccess`, {
              method: "POST",
           
              body: JSON.stringify({
              role:user.role,
              department:user.department,
              instituteName:user.instituteName,
              lab:user.labtype
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
          .then(response => response.json())
          .then(json => 
            {
              console.log(json)
              setUsers(() => json);
           
            }
            );
       
           
        
          }, []);

          let individuals = users;
          console.log(typeof users)
           // let individuals = users.reverse();
         individuals.map((userr, ident) => {
            
               return rows.push({
                 id: ident+1,
                 Name: userr.name,
                 Email: userr.email,
        
         
               });
         
           });
         
        

  return (
    <div>
    <MaterialTable
          columns={columns1}
          data={rows}
          title="Students List"
          style={{width:"500px"}}
        //   onRowClick= {(e,data) => {playUser(data.ProcedureId)}}
     
          options={{
            actionsColumnIndex: -1, grouping:true,  pageSizeOptions:[5,10],pageSize:10,headerStyle: {
              zIndex:0
            }     
          }}
        //   localization={{
        //     pagination:{labelRowsSelect:"Runz"},
        //     body: {
            
        //       editRow: {
        //         deleteText: `Are you sure you want to delete this runz`
        //       }
        //   }
        //   }}
        //   actions={[
        //     {
        //       icon: 'add',
        //       tooltip: 'Add Runz',
        //       isFreeAction: true,
        //       onClick:() => openModal()
        //     },
        //     {
        //       icon: () => <RiShareForwardFill/>,
        //       tooltip: "Share",
        //        onClick: (e, data) => shareRunz(data)
        //       // onClick: (e, data) => alert(data.ProcedureId)
        //     },
        //   ]} 
        //   editable={{
        //     onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
        //       deleteUser(selectedRow.ProcedureId)
        //       console.log(selectedRow)
        //       setTimeout(() => resolve(), 500);
        //     }),

        //   }}
        />
    </div>
  )
}

export default Detailsteacher