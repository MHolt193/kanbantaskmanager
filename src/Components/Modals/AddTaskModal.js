import React, { useState } from "react";
import classes from "./AddTaskModal.module.css";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

const AddTaskModal = (props) => {
  const token = localStorage.getItem("token");
  const [subTasks, setSubTasks] = useState([{ title: " ", status: "todo" }]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      board: props.selectedBoardId,
      title: form.taskTitle.value,
      description: form.taskDescription.value,
      subtasks: [subTasks],
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

  const addSubTaskHandler = (e) => {
    e.preventDefault();
    setSubTasks((prev) => [...prev, { title: "", status: "todo" }]);
  };

  const removeSubTaskHandler = (index) => {
    const stateCopy = [...subTasks];
    stateCopy.splice(index, 1);

    setSubTasks(stateCopy);
  };

  const subTaskChangeHandler = (object) => {
    return (event) => {
      setSubTasks((prev) =>
        prev.map((task) => {
          if (object === task) {
            task = { ...task, title: event.target.value };
          }
          return task;
        })
      );
    };
  };

  return (
    <div className={classes.modalContainer}>
      <div className={classes.modal}>
        <div className={classes.titleContainer}>
          <h2>Add New Task</h2>
          <button className={classes.closeBtn} onClick={props.addTaskHandler}>
            <FaTimes />
          </button>
        </div>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.formInfo}>
            <label for="taskTitle">Title</label>
            <input type="text" id="taskTitle" name="taskTitle" required />
            <label for="taskDescription">Description</label>
            <textarea
              id="taskDescription"
              name="taskDescription"
              className={classes.descriptionBox}
              required
            />
          </div>
          <div className={classes.formInfo}>
            <label>Subtasks</label>
            {subTasks.map((task, index) => {
              return (
                <div className={classes.subTaskContainer}>
                  <input
                    type="text"
                    key={index}
                    value={task.title}
                    onChange={subTaskChangeHandler(task)}
                  />
                  <button
                    type="button"
                    className={classes.closeBtn}
                    onClick={() => removeSubTaskHandler(index)}
                  >
                    <FaTimes />
                  </button>
                </div>
              );
            })}
            <button className={classes.subTaskBtn} onClick={addSubTaskHandler}>
              +Add New Subtask
            </button>
          </div>
          <div className={classes.formInfo}>
            <label for="taskStatus">Status</label>
            <select
              id="tasktStatus"
              name="taskStatus"
              className={classes.statusSelect}
            >
              <option className={classes.statusOption}>Todo</option>
              <option className={classes.statusOption}>Doing</option>
              <option className={classes.statusOption}>Done</option>
            </select>
            <button type="submit" className={classes.submitBtn}>
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
