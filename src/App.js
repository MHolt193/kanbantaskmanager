import React, { useState, useEffect } from "react";
import Login from "./Components/LoginSignup/Login";
import Signup from './Components/LoginSignup/Signup'
import "./App.css";
import Home from "./Components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home loggedIn={loggedIn} />} />
        <Route
          path="login"
          element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        />
        <Route
          path="signup"
          element={<Signup loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
