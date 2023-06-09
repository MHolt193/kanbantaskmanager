import React, { useState } from "react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import { HiPlus, HiX } from "react-icons/hi";
import classes from "./ShareBoardModal.module.css";

const ShareBoardModal = (props) => {
  const [usersToInvite, setUsersToInvite] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const { closeShareBoard, selectedBoard, selectedBoardId } = props;

  const searchUsersHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      name: form.search.value,
    };
    axios
      .post("http://192.168.0.10:5000/api/users/search", formData)
      .then((response) => {
        let data = response.data;
        setSearchResult(data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addInviteHandler = (e) => {
    if (
      usersToInvite.includes(
        usersToInvite.find((user) => user.name === e.currentTarget.value)
      )
    ) {
      setUsersToInvite((prev) => prev);
    } else {
      setUsersToInvite([
        ...usersToInvite,
        { name: e.currentTarget.value, id: e.currentTarget.id },
      ]);
    }
  };
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
        <form onSubmit={searchUsersHandler}>
          <input
            type="text"
            id="searchBar"
            name="search"
            className={
              props.darkMode
                ? `${classes.input} ${classes.dark}`
                : `${classes.input} ${classes.light}`
            }
          />
          <button type="submit" id="searchButton">
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
                    <button
                      type="button"
                      value={item.name}
                      id={item.id}
                      onClick={addInviteHandler}
                    >
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
