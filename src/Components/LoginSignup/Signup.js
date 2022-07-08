import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import classes from "./LoginSignup.module.css";

const Signup = (props) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState({});

  const signUpSubmitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
    };
    axios
      .post("https://kanbantaskmanager.herokuapp.com/api/users", formData)
      .then((response) => {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(response.data._id));
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data);
      });
  };

  return (
    <div className={classes.container}>
      <form onSubmit={signUpSubmitHandler} className={classes.form}>
        <h1>
          Welcome!
          <br />
          Please Register!
        </h1>
        <label htmlFor="name" className={classes.inputLabels}>
          Name
          <input
            type="text"
            placeholder="eg: John Doe"
            name="name"
            required
            className={classes.input}
          />
        </label>
        <label htmlFor="email" className={classes.inputLabels}>
          Email
          <input
            type="email"
            placeholder="eg: user@user.com"
            name="email"
            required
            className={classes.input}
          />
        </label>
        <label htmlFor="password" className={classes.inputLabels}>
          Password
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
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
        <button type="submit" className={classes.registerBtn}>
          Register
        </button>
        <p className={classes.registerContainer}>
          Already have an account?{" "}
          <Link to="/login" className={classes.loginLink}>
            <button type="button" className={classes.loginBtn}>
              Login
            </button>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
