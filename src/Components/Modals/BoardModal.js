import React from "react";
import classes from "./BoardModal.module.css";
import axios from "axios";

const BoardModal = (props) => {
  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      title: form.boardName.value,
    };
    const token = localStorage.getItem("token");
    axios
      .post("http://192.168.0.57:5000/api/boards", formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        console.log(response);
        props.setBoards((prev) => [...prev, response.data]);
        if(response.status === 200){
            props.setNewBoardModal((prev) => !prev);
        }
      });
  };

  return (
    <div className={classes.modalContainer}>
      <form className={classes.form} onSubmit={submitHandler}>
        <h2 className={classes.title}>Create Board</h2>
        <button className={classes.closeBtn} onClick={props.addBoardsHandler}>
          X
        </button>
        <input
          className={classes.input}
          type="text"
          placeholder="Board Name"
          name="boardName"
        />
        <button className={classes.submitBtn} type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default BoardModal;
