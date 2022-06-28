import React from 'react'
import classes from './AddTaskBar.module.css'

const AddTaskBar = (props) =>{


    return(
        <div className={classes.container}>
            <h2>{props.selectedBoard}</h2>
            <div>
            <button onClick={props.addTaskHandler} className={classes.newTaskBtn}>+Add New Task</button>
            <button onClick={props.logOutHandler}>Log Out</button>
            </div>
        </div>
    )
}

export default AddTaskBar