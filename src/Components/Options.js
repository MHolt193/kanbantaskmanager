import React from 'react';
import classes from './Options.module.css'

const Options = (props) =>{
    return <ul className={classes.container}>
        <li className={classes.menuOption}>Logout</li>
        <li className={classes.delete}>Delete Current Board</li>
        </ul>
    
}

export default Options