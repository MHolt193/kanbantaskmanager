import React from "react";
import classes from "./MobileMenu.module.css";
import { TbLayoutBoardSplit } from "react-icons/tb";

const MobileMenu = (props) => {
  const { selectedBoard, selectBoardHandler, boards, addBoardsHandler } = props;

  return (
    <ul className={classes.container}>
      {boards.map((board) => {
        return (
          <li
          id={board._id} key={board._id}
            onClick={selectBoardHandler}
            className={
              selectedBoard === board.title
                ? classes.active
                : classes.boardContainer
            }
          >
            <TbLayoutBoardSplit className={classes.boardIcon} />
            <p >
              {board.title}
            </p>
          </li>
        );
      })}
      <li
        className={classes.boardContainer}
        style={{ color: "#6A65AC" }}
        onClick={addBoardsHandler}
      >
        <TbLayoutBoardSplit className={classes.boardIcon} />
        <p>+Create New Board</p>
      </li>
    </ul>
  );
};

export default MobileMenu;
