import React, { useState } from "react";
import Icon from "./Icon";
import classes from "./Notifications.module.css";

const Notifications = () => {
  //State
  const [dropdownActive, setDropdownActive] = useState(false);

  //Handlers
  let iconClickHandler = () => {
    setDropdownActive((prev) => !prev);
  };

  return (
    <div>
    <Icon onClick={iconClickHandler} className={classes.icon}/>
      <div
        className={
          dropdownActive
            ? `${classes.dropdown} ${classes.active}`
            : `${classes.dropdown} ${classes.inactive}`
        }
      >
        <ul>
          <li>Notification 1</li>
        </ul>
      </div>
    </div>
  );
};

export default Notifications;
