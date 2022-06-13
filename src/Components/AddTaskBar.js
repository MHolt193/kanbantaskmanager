import React from 'react'
import classes from './AddTaskBar.module.css'

const AddTaskBar = (props) =>{
    return(
        <div className={classes.container}>
            <h2>{props.selectedBoard}</h2>
            <button>+Add New Task</button>
        </div>
    )
}

export default AddTaskBar