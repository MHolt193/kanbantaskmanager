import React, { useState } from "react";
import Options from "./Options";
import MobileMenu from "./MobileMenu";
import classes from "./AddTaskBar.module.css";
import {
  HiViewBoards,
  HiPlus,
  HiDotsVertical,
  HiChevronDown,
} from "react-icons/hi";

const AddTaskBar = (props) => {
  const [optionsMenu, setOptionsMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className={classes.container}>
      <div
        className={classes.header}
        onClick={() => props.isMobile && setMobileMenu((prev) => !prev)}
      >
        <HiViewBoards
          className={classes.headerIcon}
          style={
            props.isMobile
              ? { fill: "url(#top-purple-gradient" }
              : { display: "none" }
          }
        />
        <h2>{props.selectedBoard}</h2>
        {props.isMobile && (
          <HiChevronDown style={{ color: "#635EC2", fontSize: "25px" }} />
        )}
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
        {props.isMobile && mobileMenu && (
          <MobileMenu
            selectedBoard={props.selectedBoard}
            addBoardsHandler={props.addBoardsHandler}
            selectBoardHandler={props.selectBoardHandler}
            boards={props.boards}
          />
        )}
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
        <button
          className={classes.options}
          onClick={() => setOptionsMenu((prev) => !prev)}
        >
          <HiDotsVertical />
        </button>
        {optionsMenu && (
          <Options
            logOutHandler={props.logOutHandler}
            selectedBoardId={props.selectedBoardId}
            setBoards={props.setBoards}
            setSelectedBoardId={props.setSelectedBoardId}
            setSelectedBoard={props.setSelectedBoard}
            setOptionsMenu={setOptionsMenu}
          />
        )}
      </div>
    </div>
  );
};

export default AddTaskBar;
