import axios from "axios";
import React from "react";
import classes from "./ViewTaskOptions.module.css";

const ViewTaskOptions = (props) => {
  const {
    darkMode,
    setViewTaskModal,
    taskInfo,
    setTaskList,
    token,
    selectedTaskId,
  } = props;
  const exitModal = () => {
    setViewTaskModal((prev) => !prev);
  };

  const deleteTaskHandler = async () => {
    axios.delete(`https://kanbantaskmanager.herokuapp.com/api/boards/list/${selectedTaskId}`, {
      headers: { Authorization: `Bearer ${JSON.parse(token)}` },
    }).then(()=>{
        setTaskList((prev)=>{
            let prevCopy = [...prev];
            return prevCopy.filter((t) => t._id !== selectedTaskId);
        })
    });
    setViewTaskModal(false);
  };

  const saveAndExitHandler = async () => {
    axios
      .put(
        `https://mhkanbanbackend.onrender.com/api/boards/list/${selectedTaskId}`,
        taskInfo,
        {
          headers: { Authorization: `Bearer ${JSON.parse(token)}` },
        }
      )
      .then((response) => {
        console.log(response);
        setTaskList((prev) => {
          let prevCopy = [...prev];
          return prevCopy.map((task) => {
            if (taskInfo._id === task._id) {
              task = { ...taskInfo };
            }
            return task;
          });
        });
        setViewTaskModal(false);
      });
  };

  return (
    <ul
      className={`${classes.container} ${
        darkMode ? classes.dark : classes.light
      }`}
    >
      <li
        onClick={exitModal}
        className={`${classes.menuOption} ${
          darkMode ? classes.dark : classes.light
        }`}
      >
        Exit
      </li>
      <li
        className={`${classes.menuOption} ${
          darkMode ? classes.dark : classes.light
        }`}
        onClick={saveAndExitHandler}
      >
        Save and Exit
      </li>
      <li
        className={`${classes.delete} ${
          darkMode ? classes.dark : classes.light
        }`}
        onClick={deleteTaskHandler}
      >
        Delete Task
      </li>
    </ul>
  );
};

export default ViewTaskOptions;
