import React from "react";
import classes from './AddTaskModal.module.css'

const AddTaskModal = (props) => {


  return (
    <div className={classes.modalContainer}>
      <div>
        <h2>Add New Task</h2>
        <form>
          <div>
            <label for="taskTitle">Title</label>
            <input type="text" id="taskTitle" name="taskTitle" />
            <label for="taskDescription">Description</label>
            <textarea id="taskDescription" name="taskDescription" />
          </div>
          <div>
            <label>Subtasks</label>
            <input type='text' name='subtask1' />
            <input type='text' name='subtask2' />
            <button>+Add New Subtask</button>
          </div>
          <div>
            <label for='taskStatus'>Status</label>
            <select id='textStatus' name='textStatus'>
                <option>Todo</option>
                <option>Doing</option>
                <option>Done</option>
            </select>
            <button>Create Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
