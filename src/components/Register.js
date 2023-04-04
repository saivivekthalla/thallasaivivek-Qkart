import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { useHistory } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [confirmPassword,setconfirmPassword] = useState("")
  const [loader,setLoader] = useState(false)
  const history = useHistory()
  // function capturing(event)
  // {
    
  //   // console.log(username)
  // }


  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async (formData) => {
    if(validateInput(formData))
    {
       try{
        //register.preventDefault()
      console.log(formData.username)
      setLoader(true)
      let res  = await axios.post(`${config.endpoint}/auth/register`,{username,password})
      setLoader(false)
      console.log(res.data.success)
      if(res.data.success===true)
      {
        enqueueSnackbar("Registerd successfully")
      }
      console.log(res.data.success)
    
      }
      catch(err)
      {  
      // if(err.data.success===false)
      // {
      //   enqueueSnackbar("Username already exists")
      // }
      //   enqueueSnackbar("Something went wrong.Check taht the backend is running,reachable and returns valid JSON")
      if(err.response.data.success===false)
      {
        enqueueSnackbar(`${err.response.data.message}`)
      }
      else{
        enqueueSnackbar("Something went wrong.Check that the backend is running,reachable and returns valid JSON")
      }
      }
    }
    
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    
        
    if(data.username===''){ 
      enqueueSnackbar("Username is a required field") 
      return false;
    } 
    else if( data.username.length<6 ){
      enqueueSnackbar("Username must be at least 6 characters")
    return false
  }
    else if( data.password ==="" ){
      enqueueSnackbar("Password is a required field")
      return false
  }
    if( data.password.length<6){
      enqueueSnackbar("Password must be at least 6 characters")
    return false} 
    else if( data.confirmPassword!==data.password){
      enqueueSnackbar("Passwords do not match")
    return false}
    else{
      return true
    }
    

  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons={false} />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            onChange={(event)=>{setUsername(event.target.value)}}
            fullWidth
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            onChange={(event)=>{setPassword(event.target.value)
            }}
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            onChange={(event)=>{setconfirmPassword(event.target.value)}}
            fullWidth
          />
           <Button onClick={() => {register({username, password, confirmPassword})
            history.push('/login')}} className="button" variant="contained">
            Register Now
           </Button>
           {
           loader?(<CircularProgress />):(<div></div>)
           }
          <p className="secondary-action">
            Already have an account?{" "}
             <Link to="/login">Login here</Link>
              
             
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
