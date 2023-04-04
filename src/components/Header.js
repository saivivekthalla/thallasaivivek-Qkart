import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack, AvatarGroup } from "@mui/material";
import { useHistory, Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import { margin } from "@mui/system";
import React from "react";
import "./Header.css";
import { Search, SentimentDissatisfied } from "@mui/icons-material";

import {
  CircularProgress,
  Grid,
  InputAdornment,
} from "@mui/material";
import { Flare } from "@mui/icons-material";

const Header = ({ children, hasHiddenAuthButtons }) => {
  const history = useHistory()

  const logout = () => {
    localStorage.clear();
    // render(){return(<Header hasHiddenAuthButtons={false} />)};
    // console.log(localStorage.getItem("token"))
    window.location.reload()


  }
  // console.log("ll")
  
    // return (<div>
    //   <Box className="header">
    //     <Box className="header-title">
    //       <img src="logo_light.svg" alt="QKart-icon"></img>
    //     </Box>

    //     {children}




    //     <Stack direction="row" spacing={2}>
    //       <Button onClick={() => {
    //         history.push("/login")

    //       }}>LOGIN</Button>
    //       <Button variant="contained" onClick={() => {
    //         history.push("/register")


    //       }}>REGISTER</Button>
    //     </Stack>
    //   </Box>
    // </div>)
  
 
    if (hasHiddenAuthButtons === true) {

      
      // console.log("dk")
      if (localStorage.getItem("token") === null) {
        // console.log(children)
        return (
          <div>
            <Box className="header">
              <Box className="header-title">
                <img src="logo_light.svg" alt="QKart-icon"></img>
              </Box>

              {children}


              <Stack direction="row" spacing={2}>
                <Button onClick={() => {
                  history.push("/login")

                }}>LOGIN</Button>
                <Button variant="contained" onClick={() => {
                  history.push("/register")


                }}>REGISTER</Button>
              </Stack>
            </Box>
          </div>)
      }


      else {
        return (
          <div>
            <Box className="header">
              <Box className="header-title">
                <img src="logo_light.svg" alt="QKart-icon"></img>
              </Box>
              {children}
              <Stack direction="row" spacing={2}>

                <Avatar alt={localStorage.getItem("username")} src="avatar.png" />
                <p style={{ marginTop: "0.6rem", marginLeft: "0.5rem" }}>{localStorage.getItem("username")}</p>

                <Button onClick={() => {
                  logout()

                }}>LOGOUT</Button>

              </Stack>

            </Box>
          </div>)
      }
    }
    else {



      // console.log("hfj")
      return (<Box className="header">
        <Box className="header-title">
          <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={() => {
            history.push("/")

          }}
        >
          Back to explore
        </Button>
      </Box>
      )
    }
  




  //   // const product = hasHiddenAuthButtons
  //   // console.log(product)
  //   // const {loginout} = children
  //   // console.log(hasHiddenAuthButtons)
  //   // console.log(localStorage.getItem("username"))
  //   // localStorage.clear();
  // // console.log(localStorage.getItem("token"))
  //   if(localStorage.getItem("token") !== null)
  //   {
  //     console.log("jfk")
  //     console.log(localStorage.getItem("username"))
  //     return(<Box className="header">
  //         <Box className="header-title">
  //             <img src="logo_light.svg" alt="QKart-icon"></img>
  //         </Box>
  //         <Stack direction="row" spacing={2}>
  //           <Button onClick={logout}>LOGOUT</Button>
  //           <Button variant="contained">REGISTER</Button>
  //         </Stack>

  //     </Box>
  //     )
  //   }
  //   else{

  //     return (
  //       <Box className="header">
  //         <Box className="header-title">
  //             <img src="logo_light.svg" alt="QKart-icon"></img>
  //         </Box>
  //         {hasHiddenAuthButtons?(
  //         <Stack direction="row" spacing={2}>
  //           <Button >LOGIN</Button>
  //           <Button variant="contained">REGISTER</Button>
  //         </Stack>
  //         )
  //         :
  //         <Button
  //           className="explore-button"
  //           startIcon={<ArrowBackIcon />}
  //           variant="text"
  //         >
  //           Back to explore
  //         </Button>

  //     }

  //       </Box>
  //     )
  //   };
};

export default Header;
