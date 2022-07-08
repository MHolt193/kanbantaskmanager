import React from "react";
import classes from "./BoardModal.module.css";
import axios from "axios";

const BoardModal = (props) => {
  const { setBoards, setNewBoardModal, addBoardsHandler, darkMode } = props;

  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      title: form.boardName.value,
    };
    const token = localStorage.getItem("token");
    axios
      .post("https://kanbantaskmanager.herokuapp.com/api/boards", formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        console.log(response);
        setBoards((prev) => [...prev, response.data]);
        if (response.status === 200) {
          setNewBoardModal((prev) => !prev);
        }
      });
  };

  return (
    <div className={classes.modalContainer}>
      <form
        className={`${classes.form} ${darkMode ? classes.dark : classes.light}`}
        onSubmit={submitHandler}
      >
        <h2
          className={`${classes.title}  ${
            darkMode ? classes.dark : classes.light
          }`}
        >
          Create Board
        </h2>
        <button className={classes.closeBtn} onClick={addBoardsHandler}>
          X
        </button>
        <input
          className={`${classes.input}  ${
            darkMode ? classes.dark : classes.light
          }`}
          type="text"
          placeholder="Board Name"
          name="boardName"
          required
        />
        <button className={classes.submitBtn} type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default BoardModal;
