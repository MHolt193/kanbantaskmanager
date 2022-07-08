import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import classes from "./LoginSignup.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState({});

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = {
      email: form.email.value,
      password: form.password.value,
    };
    await axios
      .post("https://kanbantaskmanager.herokuapp.com/api/users/login", formData)
      .then((response) => {
        const data = response.data;
        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem("user", JSON.stringify(data._id));
        if (response.status === 200) {
          navigate("/", { replace: true });
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        setErrorMessage(error.response.data);
      });
  };

  return (
    <div className={classes.container}>
      <form onSubmit={loginSubmitHandler} className={classes.form}>
        <h1>Welcome Back! Login!</h1>
        <label htmlFor="email" className={classes.inputLabels}>
          Email
          <input
            type="email"
            placeholder="Demo: user@user.com"
            id="email"
            name="email"
            className={classes.input}
          />
        </label>
        <label htmlFor="password" className={classes.inputLabels}>
          Password
          <input
            type="password"
            placeholder="Demo: 123456"
            id="password"
            name="password"
            className={classes.input}
          />
        </label>
        {errorMessage?.message && (
          <p
            style={{
              color: "red",
              display: errorMessage.message.length === 0 ? "none" : "block",
              margin: 0,
              padding: 0,
            }}
          >
            {errorMessage.message}
          </p>
        )}
        <button type="submit" className={classes.loginBtn}>
          Login
        </button>
        <p className={classes.registerContainer}>
          Need to register?{" "}
          <Link to="/signup" className={classes.registerLink}>
            <button type="button" className={classes.registerBtn}>
              Register
            </button>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
