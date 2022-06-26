import React, { useState, useEffect } from "react";
import AddTaskBar from "./AddTaskBar";
import SideBar from "./SideBar";
import TaskView from "./TaskView";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BoardModal from "./Modals/BoardModal";
import AddTaskModal from "./Modals/AddTaskModal";

const Home = () => {
  //STATE
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedBoardId, setSelectedBoardId] = useState("");
  const [newBoardModal, setNewBoardModal] = useState(false);
  const [newTaskModal, setNewTaskModal] = useState(false);
  const [viewTaskModal, setViewTaskModal] = useState(false);

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
        .get("http://192.168.0.57:5000/api/boards", {
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
  const addTaskHandler = (e) => {
    setNewTaskModal((prev) => !prev);
  };

  const logOutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
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
          setSelectedBoardId={selectedBoardId}
          addTaskHandler={addTaskHandler}
        />
      )}
      <SideBar
        addBoardsHandler={addBoardsHandler}
        selectBoardHandler={selectBoardHandler}
        boards={boards}
      />
      <AddTaskBar selectedBoard={selectedBoard} logOutHandler={logOutHandler} addTaskHandler={addTaskHandler} />
      <TaskView boards={boards} selectedBoard={selectedBoard} />
    </>
  );
};

export default Home;
