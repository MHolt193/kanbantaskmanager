import axios from "axios";
import React, { useEffect } from "react";
import Task from "./Task";
import classes from "./TaskView.module.css";
import { GoPrimitiveDot } from "react-icons/go";
const TaskView = (props) => {
  const token = localStorage.getItem("token");
  const { taskList, setTaskList, selectedBoardId } = props;
  let todoTasks = taskList.filter((task) => {
    let sortedTask = "";
    if (task.status === "Todo") {
      sortedTask = task;
    }
    return sortedTask;
  });
  let doingTasks = taskList.filter((task) => {
    let sortedTask = "";
    if (task.status === "Doing") {
      sortedTask = task;
    }
    return sortedTask;
  });
  let doneTasks = taskList.filter((task) => {
    let sortedTask = "";
    if (task.status === "Done") {
      sortedTask = task;
    }
    return sortedTask;
  });

  useEffect(() => {
    const getTasks = async () => {
      axios
        .get(`http://192.168.0.57:5000/api/boards/list/${selectedBoardId}`, {
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
    <div className={classes.container}>
      <div>
        <div className={classes.containerTitle}>
          <GoPrimitiveDot className={classes.todoDot} />
          <p>TODO ({todoTasks.length})</p>
        </div>
        {todoTasks.map((task) => {
          return (
            <Task
              title={task.title}
              id={task._id}
              key={task._id}
              subtasks={task.subtasks}
              onClick={props.viewTaskHandler}
            />
          );
        })}
      </div>
      <div>
        <div className={classes.containerTitle}>
          {" "}
          <GoPrimitiveDot className={classes.doingDot} />
          <p>DOING ({doingTasks.length})</p>
        </div>
        {doingTasks.map((task) => {
          return (
            <Task
              title={task.title}
              id={task._id}
              key={task._id}
              subtasks={task.subtasks}
              onClick={props.viewTaskHandler}
            />
          );
        })}
      </div>
      <div>
        <div className={classes.containerTitle}>
          <GoPrimitiveDot className={classes.doneDot} />
          <p>DONE ({doneTasks.length})</p>
        </div>
        {doneTasks.map((task) => {
          return (
            <Task
              title={task.title}
              id={task._id}
              key={task._id}
              subtasks={task.subtasks}
              onClick={props.viewTaskHandler}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TaskView;
