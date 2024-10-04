import React from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Clock, MapPin, DollarSign, User, Briefcase, Calendar } from 'lucide-react';
import Home from "./pages/home";
import Allworks from "./pages/allworks/allwork";
import SignUp from "./pages/registration/registration";
import LogIn from "./pages/login/login";
import Accountdetails from "./pages/accountdetails/accountdetails";
import Userprofile from "./pages/userprofilepage/userprofile";
import AdminProfile from "./pages/adminprofilepage/adminprofilepage";
import ProjectDetails from "./pages/projectdetails/projectdetails";
import Allrequests from "./pages/allrequestpage/allrequest";
import "./App.css";

// This is the ProjectDetails component we created earlier


const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/allworks" element={<Allworks/>}/>
      <Route exact path="/signup" element={<SignUp/>}/>
      <Route exact path="/login" element={<LogIn/>}/>
      <Route exact path="/projectdetails" element={<ProjectDetails/>}/>
      <Route exact path="/accountdetails" element={<Accountdetails/>}/>
      <Route exact path="/userprofile" element={<Userprofile/>}/>
      <Route exact path="/adminprofile" element={<AdminProfile/>}/>
      <Route exact path="/allrequests" element={<Allrequests/>}/>
    </Routes>
  );
};
 
export default App;