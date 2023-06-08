import React from "react";

import classes from "./Task.module.css";

const Task = (props) => {
  const { id, onClick, title, subtasks, darkMode, taskColumn, createdAt, updatedAt } = props;

  let doneSubTasks = 0;
  subtasks.map((task) => {
    if (task.status === "done") {
      doneSubTasks++;
    }
    return doneSubTasks;
  });
  const parsedDate = (date) =>{
    date = new Date(date);
    return `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`;
  }

  return (
    <div
      className={`${classes.container} ${
        darkMode ? classes.dark : classes.light
      }`}
      id={id}
      onClick={onClick}
    >
      <p className={classes.title}>{title}</p>
      <p
        className={classes.subtasks}
      >{`${doneSubTasks} of ${subtasks.length} subtasks`}</p>
      <p className={classes.timeStamp}>
        {taskColumn === "Todo"
          ? `Created: ${parsedDate(createdAt)} `
          : taskColumn === "Doing"
          ? `Updated: ${parsedDate(updatedAt)}`
          : `Finished: ${parsedDate(updatedAt)}`}
      </p>
    </div>
  );
};
export default Task;
