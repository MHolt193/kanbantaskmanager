import React, { useState } from "react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import { HiPlus, HiX } from "react-icons/hi";
import classes from "./ShareBoardModal.module.css";

const ShareBoardModal = (props) => {
  const [usersToInvite, setUsersToInvite] = useState([]);
  const [searchResult, setSearchResult] = useState([{name: "Michael Holt", id: "userid"}]);

  const { closeShareBoard, selectedBoard, selectedBoardId } = props;

  const addInviteHandler = (e) =>{
    setUsersToInvite([{name: e.target.parentElement.innerText, id: e.target.parentElement.id}])
    console.log(e.target)
  }
  return (
    <div className={classes.modalContainer}>
      <div
        className={
          props.darkMode
            ? `${classes.modal} ${classes.dark}`
            : `${classes.modal} ${classes.light}`
        }
      >
        <div
          className={
            props.darkMode
              ? `${classes.titleContainer} ${classes.dark}`
              : `${classes.titleContainer} ${classes.light}`
          }
        >
          <p>Share Board</p>
          <button
            type="button"
            className={classes.closeBtn}
            onClick={closeShareBoard}
          >
            <HiX />
          </button>
        </div>
        <form>
          <input
            type="text"
            id="searchBar"
            className={
              props.darkMode
                ? `${classes.input} ${classes.dark}`
                : `${classes.input} ${classes.light}`
            }
          />
          <button type="button" id="searchButton">
            <BsSearch />
          </button>
        </form>
        <div>
          <p>search results</p>
          <ul>
            {searchResult.length !== 0 &&
              searchResult.map((item) => {
                return (
                  <li>
                    {item.name}
                    <button type="button" value={item.name} id={item.id} onClick={addInviteHandler}>
                      <HiPlus />
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
        <form>
          <p>Users To Invite</p>
          <ul>
            {usersToInvite.map((user) => {
              return <li>{user.name}</li>;
            })}
          </ul>
        </form>
      </div>
    </div>
  );
};

export default ShareBoardModal;
