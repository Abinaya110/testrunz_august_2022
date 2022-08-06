import { Grid } from '@material-ui/core'
import React from 'react'
import Firsttab from './Firsttab'
import Secondtab from './Secondtab'
import video from "./videos.mp4"
const Landingpage = () => {
  return (
    <div>
          {/* <div style={{ display: "block" ,backgroundColor:"yellow",height: "600px",}}> */}
            
            {/* <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                >
                    <Grid item>sdfdsf</Grid>
                    <Grid item> */}
                     {/* <div
                     style={{
                        position: "absolute",
                        // top: 0,
                        // left: 0,
                       
                        height: "500px",
                        backgroundColor: "rgba(0,0,0,.7)"
                     }}
                     >

                     </div>  */}
                        <video style={{ width: "100%",height: "600px",margin:0,backgroundSize: "cover"}} src={video} autoPlay muted loop />
                       
                    {/* </Grid>

                </Grid> */}
        
            {/* </div> */}
            <div>
                <Firsttab/>
            </div>
            <div>
                <Secondtab/>
            </div>
    </div>
  )
}

export default Landingpage