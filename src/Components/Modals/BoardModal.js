import React from 'react'
import classes from './BoardModal.module.css'

const BoardModal = (props) =>{
return(
    <div className={classes.modalContainer}>
        <form className={classes.form}>
            <button>X</button>
            <input type='text' placeholder='Board Name' name='boardName'/>
            <button type='submit'>Create</button>
        </form>
    </div>
)
}

export default BoardModal