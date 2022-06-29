import React, { useState, useEffect } from "react";
import AddTaskBar from "./AddTaskBar";
import SideBar from "./SideBar";
import TaskView from "./TaskView";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BoardModal from "./Modals/BoardModal";
import AddTaskModal from "./Modals/AddTaskModal";
import ViewTaskModal from "./Modals/ViewTaskModal";

const Home = () => {
  //STATE
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedBoardId, setSelectedBoardId] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [newBoardModal, setNewBoardModal] = useState(false);
  const [newTaskModal, setNewTaskModal] = useState(false);
  const [viewTaskModal, setViewTaskModal] = useState(false);
  const [taskList, setTaskList] = useState([]);

  //First load useEffect
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user");
    if (token === null) {
      navigate("/login", { replace: true });
    }
    const getBoards = async () => {
      await axios
        .get("http://192.168.0.64:5000/api/boards", {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
          body: {
            user: userId,
          },
        })
        .then((response) => {
          setBoards(response.data);
          setSelectedBoard(response.data[0].title);
          setSelectedBoardId(response.data[0]._id);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getBoards();
  }, []);

  //Handlers
  const addBoardsHandler = (e) => {
    e.preventDefault();
    setNewBoardModal((prev) => !prev);
  };

  const selectBoardHandler = (e) => {
    setSelectedBoard(e.target.innerText);
    setSelectedBoardId(e.target.id);
  };
  const addTaskHandler = () => {
    setNewTaskModal((prev) => !prev);
  };

  const logOutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const viewTaskHandler = (e) => {
    setViewTaskModal((prev)=> !prev);
    setSelectedTaskId(e.target.id);
  };
  return (
    <>
      {newBoardModal && (
        <BoardModal
          setNewBoardModal={setNewBoardModal}
          addBoardsHandler={addBoardsHandler}
          setBoards={setBoards}
        />
      )}
      {newTaskModal && (
        <AddTaskModal
          setNewTaskModal={setNewTaskModal}
          selectedBoardId={selectedBoardId}
          addTaskHandler={addTaskHandler}
          setTaskList={setTaskList}
        />
      )}
      {viewTaskModal && selectedTaskId.length > 0 && (
        <ViewTaskModal
          selectedBoardId={selectedBoardId}
          selectedTaskId={selectedTaskId}
        />
      )}
      <SideBar
        addBoardsHandler={addBoardsHandler}
        selectBoardHandler={selectBoardHandler}
        boards={boards}
      />
      <AddTaskBar
        selectedBoard={selectedBoard}
        logOutHandler={logOutHandler}
        addTaskHandler={addTaskHandler}
      />
      {selectedBoardId.length > 0 && (
        <TaskView
          viewTaskHandler={viewTaskHandler}
          boards={boards}
          selectedBoardId={selectedBoardId}
          setTaskList={setTaskList}
          taskList={taskList}
        />
      )}
    </>
  );
};

export default Home;
