import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./ViewTaskModal.module.css";
import ViewTaskOptions from "./ViewTaskOptions";
import { HiDotsVertical } from "react-icons/hi";

const ViewTaskModal = (props) => {
  const {
    selectedBoardId,
    selectedTaskId,
    darkMode,
    taskList,
    setTaskList,
    setViewTaskModal,
  } = props;
  const token = localStorage.getItem("token");
  const [taskInfo, setTaskInfo] = useState({});
  const [optionsMenu, setOptionsMenu] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://mhkanbanbackend.onrender.com/api/boards/list/${selectedBoardId}/${selectedTaskId}`,
        { headers: { Authorization: `Bearer ${JSON.parse(token)}` } }
      )
      .then((response) => {
        setTaskInfo({ ...response.data[0] });
      });
  }, [token, selectedTaskId, selectedBoardId]);

  const optionsHandler = () => {
    setOptionsMenu((prev) => !prev);
  };

  const checkBoxHandler = (e) => {
    if (e.target.checked) {
      setTaskInfo((prev) => {
        let prevCopy = { ...prev };
        prevCopy.subtasks = prevCopy.subtasks.map((task) => {
          if (task.title === e.target.id) {
            task = { ...task, status: "done" };
          }
          return task;
        });
        let doneSubTasks = 0;
        prevCopy.subtasks.forEach((task) => {
          if (task.status === "done") doneSubTasks = doneSubTasks + 1;
        });
        if (doneSubTasks > 0 && doneSubTasks < prevCopy.subtasks.length) {
          prevCopy = { ...prevCopy, status: "Doing" };
        } else if (doneSubTasks === prevCopy.subtasks.length) {
          prevCopy = { ...prevCopy, status: "Done" };
        } else {
          prevCopy = { ...prevCopy, status: "Todo" };
        }
        return prevCopy;
      });
    } else {
      setTaskInfo((prev) => {
        let prevCopy = { ...prev };
        prevCopy.subtasks = prevCopy.subtasks.map((task) => {
          if (task.title === e.target.id) {
            task = { ...task, status: "todo" };
          }
          return task;
        });
        let doneSubTasks = 0;
        prevCopy.subtasks.forEach((task) => {
          if (task.status === "done") doneSubTasks = doneSubTasks + 1;
        });
        if (doneSubTasks > 0 && doneSubTasks < prevCopy.subtasks.length) {
          prevCopy.status = "Doing";
        } else if (doneSubTasks === prevCopy.subtasks.length) {
          prevCopy.status = "Done";
        } else {
          prevCopy.status = "Todo";
        }
        return prevCopy;
      });
    }
  };
  const selectStatusHandler = (e) =>{
    setTaskInfo((prev)=>{
      let prevCopy = {...prev}
      prevCopy.status = e.target.value;
      return prevCopy;
    })

  }
  return (
    <div className={classes.container}>
      <div
        className={`${classes.modal} ${
          darkMode ? classes.dark : classes.light
        }`}
      >
        <div className={classes.titleContainer}>
          <p>{taskInfo?.title}</p>
          <button
            type="button"
            className={classes.optionsBtn}
            onClick={optionsHandler}
          >
            <HiDotsVertical />
          </button>
          {optionsMenu && (
            <ViewTaskOptions
              setViewTaskModal={setViewTaskModal}
              taskInfo={taskInfo}
              taskList={taskList}
              setTaskList={setTaskList}
              selectedTaskId={selectedTaskId}
              token={token}
              darkMode={darkMode}
            />
          )}
        </div>

        <div className={classes.descriptionContainer}>
          <p>{taskInfo?.description}</p>
        </div>
        <label
          style={{ marginLeft: "5%", marginBottom: "10px" }}
          htmlFor="subTaskContainer"
        >
          Subtasks
        </label>
        <div className={classes.subTaskContainer} id="subTaskContainer">
          {taskInfo?.subtasks !== undefined &&
            taskInfo.subtasks.map((task, index) => {
              return (
                <div
                  className={`${classes.subtask} ${
                    darkMode ? classes.dark : classes.light
                  }`}
                >
                  <input
                    className={classes.checkbox}
                    type="checkbox"
                    id={task.title}
                    name={task.title}
                    key={index}
                    checked={task.status === "done" ? true : false}
                    onChange={checkBoxHandler}
                  />
                  <label htmlFor={task.title}>{task.title}</label>
                </div>
              );
            })}
        </div>
        <div className={classes.statusContainer}>
          <label htmlFor="statusOptions">Status</label>
          <select
            className={classes.statusSelect}
            id="statusOptions"
            name="statusOptions"
            value={taskInfo.status}
          >
            <option onClick={selectStatusHandler}>Todo</option>
            <option onClick={selectStatusHandler}>Doing</option>
            <option onClick={selectStatusHandler}>Done</option>
          </select>
        </div>
      </div>
    </div>
  );
};
export default ViewTaskModal;
