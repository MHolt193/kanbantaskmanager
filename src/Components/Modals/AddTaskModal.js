import React, { useState } from "react";
import classes from "./AddTaskModal.module.css";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

const AddTaskModal = (props) => {
  const {
    selectedBoardId,
    setTaskList,
    setNewTaskModal,
    darkMode,
    addTaskHandler,
  } = props;
  const token = localStorage.getItem("token");
  const [subTasks, setSubTasks] = useState([{ title: " ", status: "todo" }]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      board: selectedBoardId,
      title: form.taskTitle.value,
      description: form.taskDescription.value,
      subtasks: subTasks,
      status: form.taskStatus.value,
    };
    await axios
      .post("https://kanbantaskmanager.herokuapp.com/api/boards/list", formData, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` },
      })
      .then((response) => {
        if (response.status === 200) {
          setTaskList((prev) => [...prev, response.data]);
        }
        setNewTaskModal((prev) => !prev);
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
      <div
        className={`${classes.modal} ${
          darkMode ? classes.dark : classes.light
        }`}
      >
        <div className={classes.titleContainer}>
          <h2>Add New Task</h2>
          <button className={classes.closeBtn} onClick={addTaskHandler}>
            <FaTimes />
          </button>
        </div>
        <form className={classes.form} onSubmit={submitHandler}>
          <div
            className={`${classes.formInfo} ${
              darkMode ? classes.dark : classes.light
            }`}
          >
            <label htmlFor="taskTitle">Title</label>
            <input type="text" id="taskTitle" name="taskTitle" required />
            <label htmlFor="taskDescription">Description</label>
            <textarea
              id="taskDescription"
              name="taskDescription"
              className={`${classes.descriptionBox} ${
                darkMode ? classes.dark : classes.light
              }`}
              required
            />
          </div>
          <div
            className={`${classes.formInfo} ${
              darkMode ? classes.dark : classes.light
            }`}
          >
            <label>Subtasks</label>
            {subTasks.map((task, index) => {
              return (
                <div className={classes.subTaskContainer}>
                  <input
                    type="text"
                    key={`task${index}}`}
                    id={`task${index}`}
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
            <button
              type="button"
              className={classes.subTaskBtn}
              onClick={addSubTaskHandler}
            >
              +Add New Subtask
            </button>
          </div>
          <div className={classes.formInfo}>
            <label htmlFor="taskStatus">Status</label>
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
