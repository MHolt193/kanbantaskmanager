import axios from "axios";
import React, { useEffect, useState } from "react";
import Task from "./Task";
import classes from "./TaskView.module.css";

const TaskView = (props) => {
  const token = localStorage.getItem("token");
  const { taskList, setTaskList, selectedBoardId } = props;
  let todoTasks = taskList.filter((task) => {
    if (task.status === "Todo") {
      return task;
    }
  });
  let doingTasks = taskList.filter((task) => {
    if (task.status === "Doing") {
      return task;
    }
  });
  let doneTasks = taskList.filter((task) => {
    if (task.status === "Done") {
      return task;
    }
  });

  useEffect(() => {
    const getTasks = async () => {
      axios
        .get(`http://192.168.0.64:5000/api/boards/list/${selectedBoardId}`, {
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
  }, [selectedBoardId]);

  return (
    <div className={classes.container}>
      <div>
        <p>todo ({todoTasks.length})</p>
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
        <p>Doing ({doingTasks.length})</p>
        {doingTasks.map((task) => {
          return (
            <Task
              title={task.title}
              id={task._id}
              key={task._id}
              subtasks={task.subtasks}
            />
          );
        })}
      </div>
      <div>
        <p>Done ({doneTasks.length})</p>
        {doneTasks.map((task) => {
          return (
            <Task
              title={task.title}
              id={task._id}
              key={task._id}
              subtasks={task.subtasks}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TaskView;
