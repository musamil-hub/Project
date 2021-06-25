import React, { useState } from "react";
import classes from "./Modal.module.css";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import firebase from "../data/Firebase";

const EditForm = (props) => {
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [color, setColor] = useState(props.color);
  const [type, setType] = useState(props.type);
  const [id, setId] = useState(props.id);
  console.log(props);

  ////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////
  const submitHandler = (event) => {
    event.preventDefault();
    // date
    let today = new Date();
    let time = today.toLocaleString([], { hour12: true });

    let itemsfetch = {
      id: id,
      name: title,
      description: description,
      type: type,
      color: color,
      date: time,
    };
    // itemdata.push(itemsfetch);
    // console.log(itemsfetch);
    /////////////////////////////////////////////////////////////////////////////////////
    setupdate(itemsfetch, id);
    // firebases(itemsfetch);
  };

  const setupdate = (data, id) => {
      console.log(data,id)
    const firestore = firebase.database().ref("/treloo").child(id);
    firestore.update(data);
    props.onfunction();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <div className={"form-control"}>
          <label htmlFor="name">Title</label>
          <input
            type="text"
            id="name"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        {/* Description */}
        <div className={"form-control"}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className={"form-control"}>
          <label htmlFor="color">Color</label>
          <input
            type="color"
            id="color"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
            }}
          />
        </div>
        {/* selection type */}
        <div className={"form-control"}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label" className={classes.title}>
              Action-Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <MenuItem value={"todo"}>To-Do</MenuItem>
              <MenuItem value={"doing"}>Doing</MenuItem>
              <MenuItem value={"done"}>Done</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="form-actions">
        <button className={classes.button} value="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default EditForm;
