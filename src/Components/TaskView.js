import axios from "axios";
import React, { useEffect, useState } from "react";
import Task from "./Task";
import classes from "./TaskView.module.css";
import { GoPrimitiveDot } from "react-icons/go";
const TaskView = (props) => {
  const token = localStorage.getItem("token");
  const { taskList, setTaskList, selectedBoardId , viewTaskHandler, darkMode, hiddenSidebar} = props;
  const [todoTasks, setTodoTasks] = useState([]);
  const [doingTasks, setDoingTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  useEffect(() => {
    setTodoTasks(
      taskList?.filter((task) => {
        let sortedTask = "";
        if (task.status === "Todo") {
          sortedTask = task;
        }
        return sortedTask;
      })
    );
    setDoingTasks(
      taskList?.filter((task) => {
        let sortedTask = "";
        if (task.status === "Doing") {
          sortedTask = task;
        }
        return sortedTask;
      })
    );
    setDoneTasks(
      taskList?.filter((task) => {
        let sortedTask = "";
        if (task.status === "Done") {
          sortedTask = task;
        }
        return sortedTask;
      })
    );
  },[taskList]);
  useEffect(() => {
    const getTasks = async () => {
      axios
        .get(`https://kanbantaskmanager.herokuapp.com/api/boards/list/${selectedBoardId}`, {
          headers: { Authorization: `Bearer ${JSON.parse(token)}` },
        })
        .then((response) => {
          const data = response.data;
          if (response.status === 200) {
            setTaskList(data);
          }
        })
        .catch((error) => {
          console.error(error);
          setTaskList([]);
        });
    };
    getTasks();
  }, [selectedBoardId, setTaskList, token]);

  return (
    <div className={`${classes.container} ${darkMode ? classes.dark: classes.light} ${hiddenSidebar && classes.hidden}`}>
      <div className={classes.taskContainer}>
        <div className={classes.containerTitle}>
          <GoPrimitiveDot className={classes.todoDot} />
          <p>TODO ({todoTasks?.length})</p>
        </div>
        {todoTasks?.map((task) => {
          return (
            <Task
              title={task.title}
              id={task._id}
              key={task._id}
              subtasks={task.subtasks}
              onClick={viewTaskHandler}
              darkMode={darkMode}
            />
          );
        })}
      </div>
      <div className={classes.taskContainer}>
        <div className={classes.containerTitle}>
          {" "}
          <GoPrimitiveDot className={classes.doingDot} />
          <p>DOING ({doingTasks?.length})</p>
        </div>
        {doingTasks?.map((task) => {
          return (
            <Task
              title={task.title}
              id={task._id}
              key={task._id}
              subtasks={task.subtasks}
              onClick={viewTaskHandler}
              darkMode={darkMode}
            />
          );
        })}
      </div>
      <div className={classes.taskContainer}>
        <div className={classes.containerTitle}>
          <GoPrimitiveDot className={classes.doneDot} />
          <p>DONE ({doneTasks?.length})</p>
        </div>
        {doneTasks?.map((task) => {
          return (
            <Task
              title={task.title}
              id={task._id}
              key={task._id}
              subtasks={task.subtasks}
              onClick={viewTaskHandler}
              darkMode={darkMode}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TaskView;
