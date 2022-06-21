import React, { useState, useEffect } from "react";
import AddTaskBar from "./AddTaskBar";
import SideBar from "./SideBar";
import TaskView from "./TaskView";
import {useNavigate} from 'react-router-dom'

const Home = (props) => {
  const {loggedIn} = props
  const [boards, setBoards] = useState([
    {
      title: "Platform Launch",
      todo: [
        {
          title: "Build UI for onboarding flow",
          description: "",
          subtasks: [],
          status: "todo",
        },
      ],
    },
    { title: "Marketing Plan" },
    { title: "Roadmap" },
  ]);
  const navigate = useNavigate();
  const [selectedBoard, setSelectedBoard] = useState(boards[0].title);
  
  useEffect(()=>{
    if(!loggedIn){
      navigate('/login', {replace: true})
    }
  }, [])


  const addBoardsHandler = (e) => {
    e.preventDefault();
  };

  const selectBoardHandler = (e) => {
    setSelectedBoard(e.target.innerText);
  };
  const addTaskHandler = (e) =>{
    e.preventDefault();
    const form = e.target
    const formElements = form.elements;

  };

  return (
    <>
      <SideBar selectBoardHandler={selectBoardHandler} boards={boards} />
      <AddTaskBar selectedBoard={selectedBoard} />
      <TaskView boards={boards} selectedBoard={selectedBoard} />
    </>
  );
};

export default Home;
