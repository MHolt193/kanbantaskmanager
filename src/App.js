import React from "react";
import Login from "./Components/LoginSignup/Login";
import Signup from './Components/LoginSignup/Signup'
import "./App.css";
import Home from "./Components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="login"
          element={<Login />}
        />
        <Route
          path="signup"
          element={<Signup/>}
        />
      </Routes>
    </Router>
  );
};

export default App;
