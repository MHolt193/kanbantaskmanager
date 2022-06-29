import React from "react";
import classes from "./AddTaskModal.module.css";
import axios from "axios";

const AddTaskModal = (props) => {
  const token = localStorage.getItem("token");

  const submitHandler = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      board: props.selectedBoardId,
      title: form.taskTitle.value,
      description: form.taskDescription.value,
      subtasks: [form.subtask1.value, form.subtask2.value],
      status: form.taskStatus.value,
    };
    console.log(props.selectedBoardId);
    await axios
      .post("http://192.168.0.57:5000/api/boards/list", formData, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` },
      })
      .then((response) => {
        if (response.status === 200) {
          props.setTaskList((prev) => [...prev, response.data]);
        }
        props.setNewTaskModal((prev) => !prev);
      });

  };

  return (
    <div className={classes.modalContainer}>
      <div className={classes.modal}>
        <div className={classes.titleContainer}>
          <h2>Add New Task</h2>
          <button onClick={props.addTaskHandler}>X</button>
        </div>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.formInfo}>
            <label for="taskTitle">Title</label>
            <input type="text" id="taskTitle" name="taskTitle" />
            <label for="taskDescription">Description</label>
            <textarea id="taskDescription" name="taskDescription" className={classes.descriptionBox} />
          </div>
          <div className={classes.formInfo}>
            <label>Subtasks</label>
            <input type="text" name="subtask1" />
            <input type="text" name="subtask2" />
            <button className={classes.subTaskBtn}>+Add New Subtask</button>
          </div>
          <div className={classes.formInfo}>
            <label for="taskStatus">Status</label>
            <select id="tasktStatus" name="taskStatus" className={classes.statusSelect}>
              <option className={classes.statusOption}>Todo</option>
              <option className={classes.statusOption}>Doing</option>
              <option className={classes.statusOption}>Done</option>
            </select>
            <button type="submit" className={classes.submitBtn}>Create Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
