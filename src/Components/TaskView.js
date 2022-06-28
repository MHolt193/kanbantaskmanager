import React from 'react'
import classes from './TaskView.module.css'

const TaskView = (props) =>{
    

    return(
        <div className={classes.container}>
            <p>todo</p>
           {props.boards?.map((board) => { 
            let title = ''          
            if(board.title === props.selectedBoard){
                board.todo?.map((item)=>{
                    title = item.title
                })
                return <p>{title}</p>
            }
           })}
        </div>
    )
}

export default TaskView