import React, { useState } from "react";
import Login from './Components/LoginSignup/Login'
import "./App.css";
import Home from "./Components/Home";
import { Router, Route } from "react-router";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const requireAuth = (nextState, replace) => {
    if (!loggedIn) {
      replace({ pathname: "login" });
    }
  };

  return (
    <Router>
      <Route path="/">
        <Route path="home" onEnter={requireAuth}>
          <Home loggedIn={loggedIn} />
        </Route>
        <Route path="login">
          <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </Route>
      </Route>
    </Router>
  );
}

export default App;
