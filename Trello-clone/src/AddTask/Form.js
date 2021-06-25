import React from "react";
import useInput from "./use-input";
import classes from "./Modal.module.css";
import { v4 } from "uuid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import firebase from "../data/Firebase";

const isNotEmpty = (value) => value.trim() !== "";

const Form = (props) => {
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty);
  const {
    value: typeValue,
    isValid: typeIsValid,
    hasError: typeHasError,
    valueChangeHandler: typeChangeHandler,
    inputBlurHandler: typeBlurHandler,
    reset: resettype,
  } = useInput(isNotEmpty);
  const {
    value: colorValue,
    isValid: colorIsValid,
    hasError: colorHasError,
    valueChangeHandler: colorChangeHandler,
    inputBlurHandler: colorBlurHandler,
    reset: resetcolor,
  } = useInput(isNotEmpty);
  const {
    value: descriptionValue,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (nameIsValid && typeIsValid && descriptionIsValid && colorIsValid) {
    formIsValid = true;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////
  const itemdata = [];
  const submitHandler = (event) => {
    event.preventDefault();
    // date
    let today = new Date();
    let time = today.toLocaleString([], { hour12: true });

    if (!formIsValid) {
      return;
    }

    let itemsfetch = {
      id: v4(),
      name: nameValue,
      description: descriptionValue,
      type: typeValue,
      color: colorValue,
      date: time,
    };
    itemdata.push(itemsfetch);
    firebasedata(itemsfetch);
    // firebases(itemsfetch);

    resetName();
    resettype();
    resetDescription();
  };

  const firebasedata = (data) => {
    const firestore = firebase.database().ref("/treloo");
    firestore.push(data);
    console.log("passing success");
    props.onfunction();
    console.log("form end")
    props.onClose();
  };
  // const firebases = async (data) => {
  //   await fetch(
  //     `https://trello-clone-v1-default-rtdb.firebaseio.com/treloo.json`,
  //     {
  //       method: "POST",
  //       body: JSON.stringify(data),
  //     }
  //   );
  //   props.onfunction();
  //   props.onClose();
  // };

  const nameClasses = nameHasError ? "form-control invalid" : "form-control";
  const typeClasses = typeHasError ? "form-control invalid" : "form-control";
  const colorClasses = colorHasError ? "form-control invalid" : "form-control";
  const descriptionClasses = descriptionHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <div className={nameClasses}>
          <label htmlFor="name">Title</label>
          <input
            type="text"
            id="name"
            value={nameValue}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          />
          {nameHasError && <p className="error-text">Please enter a Title.</p>}
        </div>
        {/* Description */}
        <div className={descriptionClasses}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={descriptionValue}
            onChange={descriptionChangeHandler}
            onBlur={descriptionBlurHandler}
          />
          {descriptionHasError && (
            <p className="error-text">Please enter a description.</p>
          )}
        </div>
        {/* selection type */}
        <div className={colorClasses}>
          <label htmlFor="color">Color</label>
          <input
            type="color"
            id="color"
            value={colorValue}
            onChange={colorChangeHandler}
            onBlur={colorBlurHandler}
          />
          {colorHasError && <p className="error-text">Please enter a Color.</p>}
        </div>
        <div className={typeClasses}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label" className={classes.title}>
              Action-Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={typeValue}
              onChange={typeChangeHandler}
              onBlur={typeBlurHandler}
            >
              <MenuItem value={"todo"}>To-Do</MenuItem>
              <MenuItem value={"doing"}>Doing</MenuItem>
              <MenuItem value={"done"}>Done</MenuItem>
            </Select>
          </FormControl>
          {typeHasError && <p className="error-text">Please enter a Type.</p>}
        </div>
      </div>
      <div className="form-actions">
        <button
          disabled={!formIsValid}
          className={classes.button}
          value="submit"
          // onClick={props.onClose}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
