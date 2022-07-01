import React from "react";
import classes from "./AddTaskBar.module.css";
import { HiViewBoards, HiPlus,  HiDotsVertical } from "react-icons/hi";

const AddTaskBar = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <HiViewBoards
          className={classes.headerIcon}
          style={
            props.isMobile
              ? { fill: "url(#top-purple-gradient" }
              : { display: "none" }
          }
        />
        <h2>{props.selectedBoard}</h2>
        <svg width="0" height="0">
          <linearGradient
            id="top-purple-gradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="100%"
          >
            <stop stopColor="#6460C0" offset="0%" />
            <stop stopColor="#44457D" offset="100%" />
          </linearGradient>
        </svg>
      </div>
      <div className={classes.btnContainer}>
        <button onClick={props.addTaskHandler} className={classes.newTaskBtn}>
          {props.isMobile ? (
            <HiPlus style={{ fontSize: "20px" }} />
          ) : (
            <>
              <HiPlus />
              Add New Task
            </>
          )}
        </button>
        <button className={classes.options} onClick={props.logOutHandler}><HiDotsVertical /></button>
      </div>
    </div>
  );
};

export default AddTaskBar;
