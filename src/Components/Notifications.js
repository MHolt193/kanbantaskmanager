import React, {useState} from "react"
import icon from "./211694_bell_icon.svg"
import classes from "./Notifications.module.css"

const Notifications = () =>{
  //State
  const [dropdownActive, setDropdownActive] = useState(false);
  
  //Habdlers
  let iconClickHandler = (e) =>{
    setDropdownActive((prev)=> !prev)
  }
  
  return <div>
 <img onClick={iconClickHandler} className={classes.icon} src={icon} alt=""/>
 <div className={dropdownActive ? `${classes.dropdown} ${classes.active}`:`${classes.dropdown} ${classes.inactive}`}>
 <ul>
 <li>Notification 1</li>
 </ul>
 </div>
  </div>
}

export default Notifications