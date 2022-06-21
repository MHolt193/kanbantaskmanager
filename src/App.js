import React, { useState, useEffect } from "react";
import Login from './Components/LoginSignup/Login'
import "./App.css";
import Home from "./Components/Home";
import {BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
 const navigate = useNavigate();
  useEffect(()=>{
    if(!loggedIn){
     return navigate('/login')
    }
  },[loggedIn])

  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Home loggedIn={loggedIn} />} />
        <Route path="login" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}/>
      </Routes>
    </Router>
  );
}

export default App;
