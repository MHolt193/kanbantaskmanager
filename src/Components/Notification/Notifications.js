import React, { useState, useEffect } from "react";
import Icon from "./Icon";
import classes from "./Notifications.module.css";
import axios from "axios";

const Notifications = (props) => {
  //State
  const [dropdownActive, setDropdownActive] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const userId = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  //Pull notifications from backend
  useEffect(() => {
    axios
      .get(`http://192.168.0.10:5000/api/users/${userId}/notifications`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        let data = response.data;
        setNotifications(data.invites);
      });
  }, [token, userId]);

  //Handlers
  const iconClickHandler = () => {
    setDropdownActive((prev) => !prev);
  };

 const acceptInviteHandler =()=>{
  
 }

  

  return (
    <div className={classes.notificationContainer}>
      <Icon onClick={iconClickHandler} className={classes.icon} />
      {notifications.length > 0 && <p className={classes.notificationCount}>{notifications.length}</p>}
      <div
        className={
          dropdownActive
            ? `${classes.dropdown} ${classes.active}`
            : `${classes.dropdown} ${classes.inactive}`
        }
      >
        <ul>
          {notifications.map((notification) => {
            return (
              <li className={classes.notification}>{`You were invited to work on ${notification.boardName} by ${notification.invitedBy}`}<div className={classes.btnContainer}><button type="button">Accept</button> <button type="button">Decline</button></div></li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Notifications;
