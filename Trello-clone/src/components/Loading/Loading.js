import React from "react";
import logo from "../../assets/load.gif";
import classes from "./Loading.module.css";
const Loading = () => {
  return (
    <div className={classes.root}>
      <img src={logo} alt="Computer man" className={classes.logo}></img>
      <br />
      <span className={classes.fetch}>Fetching Data</span>
      <br />
      <span className={classes.please}>Please Wait...</span>
    </div>
  );
};

export default Loading;
