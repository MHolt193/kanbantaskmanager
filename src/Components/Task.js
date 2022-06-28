import classes from './Task.module.css'

const Task = (props) =>{
    return(
        <div className={classes.container}>
            <p className={classes.title}>{props.title}</p>
            <p className={classes.subtasks}>{` 0 of ${props.subtasks.length} subtasks`}</p>
        </div>
    )
}
export default Task