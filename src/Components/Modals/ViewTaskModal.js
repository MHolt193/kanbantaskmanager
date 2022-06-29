import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./ViewTaskModal.module.css";
import { HiDotsVertical } from "react-icons/hi";

const ViewTaskModal = (props) => {
  const token = localStorage.getItem("token");
  const [taskInfo, setTaskInfo] = useState({});
  useEffect(() => {
    axios
      .get(
        `http://192.168.0.57:5000/api/boards/list/${props.selectedBoardId}/${props.selectedTaskId}`,
        { headers: { Authorization: `Bearer ${JSON.parse(token)}` } }
      )
      .then((response) => {
        setTaskInfo(response.data[0]);
      });
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.modal}>
        <div className={classes.titleContainer}>
          <p>{taskInfo.title}</p>
          <HiDotsVertical />
        </div>
        <div className={classes.descriptionContainer}>
          <p>{taskInfo.description}</p>
        </div>
        <div className={classes.subTaskContainer}>
          <p>Subtasks</p>
          {taskInfo.subtasks?.map((task) => {
            return (
              <div>
                <input type="checkbox" id={task} name={task} />
                <label for={task}>{task}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ViewTaskModal;
