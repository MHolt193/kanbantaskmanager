import React from "react";
import LightDarkSwitch from "./LightDarkSwitch";
import classes from "./SideBar.module.css";
import { HiViewBoards } from "react-icons/hi";
import { TbLayoutBoardSplit } from "react-icons/tb";
import {AiOutlineEyeInvisible} from 'react-icons/ai'

const SideBar = (props) => {
  return (
    <div className={classes.container}>
      <div>
        <div className={classes.sidebarHeader}>
          <HiViewBoards
            className={classes.headerIcon}
            style={{ fill: "url(#purple-gradient" }}
          />
          <h1>kanban</h1>
          <svg width="0" height="0">
            <linearGradient
              id="purple-gradient"
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
        <p className={classes.boardCount}>ALL BOARDS ({props.boards.length})</p>
        <div>
          {props.boards.map((board) => {
            return (
              <div
                className={
                  props.selectedBoard === board.title
                    ? classes.active
                    : classes.boardContainer
                }
                onClick={props.selectBoardHandler}
                  id={board._id}
                  key={board._id}
              >
                <TbLayoutBoardSplit className={classes.boardIcon} />
                <p>
                  {board.title}
                </p>
              </div>
            );
          })}
          <div
            className={classes.boardContainer}
            style={{ color: "#6A65AC" }}
            onClick={props.addBoardsHandler}
          >
            <TbLayoutBoardSplit className={classes.boardIcon} />
            <p>+Create New Board</p>
          </div>
        </div>
      </div>
      <div>
        <LightDarkSwitch />
        <div className={classes.boardContainer}>
          <AiOutlineEyeInvisible />
          <p>Hide Sidebar</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
