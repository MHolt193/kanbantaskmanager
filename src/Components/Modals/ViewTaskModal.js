import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewTaskModal = (props) => {
  const token = localStorage.getItem("token");
  const [taskInfo, setTaskInfo] = useState({});
  useEffect(() => {
    axios
      .get(
        `http://192.168.0.64:5000/api/boards/list/${props.selectedBoardId}/${props.selectedTaskId}`,
        { headers: { Authorization: `Bearer ${JSON.parse(token)}` } }
      )
      .then((response) => {
        setTaskInfo(response.data[0]);
      });
  }, []);

  return (
    <div>
      <div>
        <p>{taskInfo.title}</p>
      </div>
    </div>
  );
};
export default ViewTaskModal;
