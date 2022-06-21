import React from "react";
import LightDarkSwitch from "./LightDarkSwitch";
import classes from "./SideBar.module.css";

const SideBar = (props) => {
  return (
    <div className={classes.container}>
      <div>
        <h1>Kanban</h1>
        <p>All Boards ({props.boards.length})</p>
        <ul>
          {props.boards.map((board) => {
            return <li onClick={props.selectBoardHandler} id={board._id} key={board._id}>{board.title}</li>;
          })}
          <li>+Create New Board</li>
        </ul>
      </div>
      <LightDarkSwitch />
      <p>Hide Sidebar</p>
    </div>
  );
};

export default SideBar;
