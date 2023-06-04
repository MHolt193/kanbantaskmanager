import React from "react";
import classes from "./Options.module.css";
import axios from "axios";
import LightDarkSwitch from "./LightDarkSwitch";

const Options = (props) => {
  const {
    selectedBoardId,
    setBoards,
    setSelectedBoardId,
    setSelectedBoard,
    setOptionsMenu,
    darkMode,
    logOutHandler,
    isMobile,
    handleLightDark,
    optionsMenu,
    setViewShareBoard,
    viewShareBoard
  } = props;

  const token = localStorage.getItem("token");
  const deleteBoardhandler = () => {
    axios
      .delete(
        `https://mhkanbanbackend.onrender.com/api/boards/${selectedBoardId}`,
        {
          headers: { Authorization: `Bearer ${JSON.parse(token)}` },
        }
      )
      .then((response) => {
        console.log(response);
        setBoards(response.data);
        setSelectedBoard(response.data[0].title);
        setSelectedBoardId(response.data[0]._id);
      })
      .catch((error) => {
        console.error(error);
      });
    setOptionsMenu(false);
  };
  
  const openShareBoard = () =>{
    setViewShareBoard(!viewShareBoard)
    setOptionsMenu(false)
  }

  return (
    <ul
      className={`${classes.container} ${
        darkMode ? classes.dark : classes.light
      } ${optionsMenu && classes.active}`}
    >
      <li
        onClick={logOutHandler}
        className={`${classes.menuOption} ${
          darkMode ? classes.dark : classes.light
        }`}
      >
        Logout
      </li>
      {isMobile && (
        <li>
          <LightDarkSwitch
            darkMode={darkMode}
            handleLightDark={handleLightDark}
          />
        </li>
      )}
      <li onClick={openShareBoard}
        className={`${classes.menuOption} ${
          darkMode ? classes.dark : classes.light
        }`}
      >
        Share Current Board
      </li>
      <li
        onClick={deleteBoardhandler}
        className={`${classes.delete} ${
          darkMode ? classes.dark : classes.light
        }`}
      >
        Delete Current Board
      </li>
    </ul>
  );
};

export default Options;
