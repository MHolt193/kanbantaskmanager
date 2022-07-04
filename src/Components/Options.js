import React from "react";
import classes from "./Options.module.css";
import axios from "axios";

const Options = (props) => {
  const { selectedBoardId, setBoards, setSelectedBoardId, setSelectedBoard } =
    props;

  const token = localStorage.getItem("token");
  const deleteBoardhandler = () => {
    axios
      .delete(`http://192.168.0.57:5000/api/boards/${selectedBoardId}`, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` },
      })
      .then((response) => {
        console.log(response);
        setBoards(response.data);
        setSelectedBoard(response.data[0].title);
        setSelectedBoardId(response.data[0]._id);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <ul className={classes.container}>
      <li onClick={props.logOutHandler} className={classes.menuOption}>
        Logout
      </li>
      <li onClick={deleteBoardhandler} className={classes.delete}>
        Delete Current Board
      </li>
    </ul>
  );
};

export default Options;
