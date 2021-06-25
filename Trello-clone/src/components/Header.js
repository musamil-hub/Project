import React from "react";
import classes from "./Header.module.css";
import Modal from "../UI/Modal";
import PostAddIcon from "@material-ui/icons/PostAdd";

const Header = (props) => {
  return (
    <div className={classes.header}>
      {/* <div className={classes.button}> */}

      <img
        className={classes.logo}
        src="https://img.icons8.com/nolan/64/trello.png"
      />
      <span className={classes.title}>Trello</span>
      <span className={classes.button}>
        <Modal
          onfunction={props.onfunction}
          button={<PostAddIcon />}
          text={"Add Task"}
        />
      </span>
    </div>
  );
};

export default Header;
