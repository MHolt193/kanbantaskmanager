import React, { useState } from "react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import { HiPlus, HiX } from "react-icons/hi";
import classes from "./ShareBoardModal.module.css";

const ShareBoardModal = (props) => {
  const [usersToInvite, setUsersToInvite] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchError, setSearchError] = useState("");

  const { closeShareBoard, selectedBoard, selectedBoardId } = props;
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  const searchUsersHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      name: form.search.value,
    };
    axios
      .post("https://mhkanbanbackend.onrender.com/api/users/search", formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        let data = response.data;
        setSearchResult(data.users);
      })
      .catch((error) => {
        setSearchError(error.response.data.message);
      });
  };

  const addInviteHandler = (e) => {
    if (
      !usersToInvite.includes(
        usersToInvite.find((user) => user.name === e.currentTarget.value)
      )
    ) {
      setUsersToInvite([
        ...usersToInvite,
        {
          name: e.currentTarget.value,
          id: e.currentTarget.id,
          status: "invited",
          board: selectedBoardId,
          boardName: selectedBoard,
          invitedBy: JSON.parse(user)
        },
      ]);
    }
  };

  const sendInvitesHandler = (e) => {
    e.preventDefault();
    const formData = {
      users: usersToInvite,
    };
    axios
      .post("https://mhkanbanbackend.onrender.com/api/users/invite", formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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
        <form onSubmit={searchUsersHandler} className={classes.form}>
          <input
            type="text"
            id="searchBar"
            name="search"
            placeholder="Name"
            className={
              props.darkMode
                ? `${classes.input} ${classes.dark}`
                : `${classes.input} ${classes.light}`
            }
          />
          <button type="submit" id="searchButton" className={classes.searchBtn}>
            <BsSearch />
          </button>
        </form>
        <div>
          <p>search results</p>
          <ul>
            {searchResult.length !== 0
              ? searchResult.map((item) => {
                  return (
                    <li>
                      {item.name}
                      <button
                        type="button"
                        id={item._id}
                        value={item.name}
                        onClick={addInviteHandler}
                      >
                        <HiPlus />
                      </button>
                    </li>
                  );
                })
              : searchError !== "" &&
                searchResult.length === 0 && <li>{searchError}</li>}
          </ul>
        </div>
        <form onSubmit={sendInvitesHandler} className={classes.inviteList}>
          <label for="inviteList">Users To Invite</label>
          <ul id="invitelist">
            {usersToInvite.map((user) => {
              return <li>{user.name}</li>;
            })}
          </ul>
          <button type="submit" className={classes.submitBtn}>Send Invites</button>
        </form>
      </div>
    </div>
  );
};

export default ShareBoardModal;
