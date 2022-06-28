import axios from "axios";
import React, { useEffect, useState } from "react";
import Task from './Task'
import classes from "./TaskView.module.css";

const TaskView = (props) => {
  const token = localStorage.getItem("token");
  const {taskList , setTaskList, selectedBoardId} = props;
  useEffect(() => {

    const getTasks = async () =>{
    axios.get(`http://192.168.0.64:5000/api/boards/list/${selectedBoardId}`,{
      headers: { Authorization: `Bearer ${JSON.parse(token)}` }
    }).then((response) =>{
        const data = response.data
        if(response.status === 200){setTaskList(data);}
    }).catch((error)=>{
      console.error(error);
      setTaskList([]);
    });}
    getTasks();

  }, [selectedBoardId]);

  return (
    <div className={classes.container}>
      <p>todo</p>
      {taskList.map((task) => {
          return <Task title={task.title} subtasks={task.subtasks} />;
        })}
    </div>
  );
};

export default TaskView;
