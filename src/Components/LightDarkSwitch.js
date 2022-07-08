import React from "react";
import classes from "./LightDarkSwitch.module.css";
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";

const LightDarkSwitch = (props) => {
  const { darkMode, handleLightDark } = props;

  return (
    <div
      className={`${classes.container} ${
        darkMode ? classes.dark : classes.light
      }`}
    >
      <BsFillSunFill />
      <input
        type="checkbox"
        id="light-dark-switch"
        className={classes.switchCheck}
        checked={darkMode ? true : false}
        onChange={handleLightDark}
      />
      <label
        htmlFor="light-dark-switch"
        className={classes.switchLabel}
        style={{ backgroundColor: darkMode && "#645FC6" }}
      >
        <span className={classes.switchBtn} />
      </label>
      <BsFillMoonStarsFill />
    </div>
  );
};
export default LightDarkSwitch;
