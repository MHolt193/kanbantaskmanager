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
import Notifications from "./Notifications"

const AddTaskBar = (props) => {
  const {
    isMobile,
    selectedBoard,
    addBoardsHandler,
    selectBoardHandler,
    boards,
    addTaskHandler,
    logOutHandler,
    selectedBoardId,
    setSelectedBoardId,
    setBoards,
    setSelectedBoard,
    handleLightDark,
    darkMode,
    hiddenSidebar,
  } = props;

  const [optionsMenu, setOptionsMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div
      className={`${classes.container} ${
        darkMode ? classes.dark : classes.light
      } ${hiddenSidebar && classes.hidden}`}
    >
      <div
        className={`${classes.header} ${
          darkMode ? classes.dark : classes.light
        }`}
        onClick={() => isMobile && setMobileMenu((prev) => !prev)}
      >
        <HiViewBoards
          className={classes.headerIcon}
          style={
            isMobile
              ? { fill: "url(#top-purple-gradient" }
              : { display: "none" }
          }
        />
        <h2>{selectedBoard}</h2>
        {isMobile && (
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
        {isMobile && mobileMenu && (
          <MobileMenu
            selectedBoard={selectedBoard}
            addBoardsHandler={addBoardsHandler}
            selectBoardHandler={selectBoardHandler}
            boards={boards}
            darkMode={darkMode}
          />
        )}
      </div>
      <div className={classes.btnContainer}>
      <Notifications/>
        <button onClick={addTaskHandler} className={classes.newTaskBtn}>
          {isMobile ? (
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
            logOutHandler={logOutHandler}
            selectedBoardId={selectedBoardId}
            setBoards={setBoards}
            setSelectedBoardId={setSelectedBoardId}
            setSelectedBoard={setSelectedBoard}
            setOptionsMenu={setOptionsMenu}
            darkMode={darkMode}
            handleLightDark={handleLightDark}
            isMobile={isMobile}
          />
        )}
      </div>
    </div>
  );
};

export default AddTaskBar;
