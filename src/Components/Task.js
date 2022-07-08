import React from "react";

import classes from "./Task.module.css";

const Task = (props) => {
    const {id, onClick, title, subtasks, darkMode} = props;

  let doneSubTasks = 0;
    subtasks.map((task) => {
      if (task.status === "done") {
        doneSubTasks++;
      }
      return doneSubTasks;
    });
  

  return (
    <div className={`${classes.container} ${darkMode ? classes.dark: classes.light}`} id={id} onClick={onClick}>
      <p className={classes.title}>{title}</p>
      <p
        className={classes.subtasks}
      >{`${doneSubTasks} of ${subtasks.length} subtasks`}</p>
    </div>
  );
};
export default Task;
