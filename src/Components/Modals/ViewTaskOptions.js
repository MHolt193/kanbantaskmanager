import React from "react";
import classes from './ViewTaskOptions.module.css'

const ViewTaskOptions = (props) => {

    const exitModal = () =>{
        props.setViewTaskModal((prev) => !prev)
    }

  return (
    <ul className={classes.container}>
      <li onClick={exitModal} className={classes.menuOption}>Exit</li>
      <li className={classes.menuOption}>Save and Exit</li>
      <li className={classes.delete}>Delete Task</li>
    </ul>
  );
};

export default ViewTaskOptions;
