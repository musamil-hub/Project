import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import classes from "./editTask.module.css";
import EditForm from "../../AddTask/EditForm";
export default function PopoverPopupState(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [type, setType] = useState("");
  const [id, setId] = useState("");
  // console.log(props.id);
  const updateHandler = (data) => {
    setTitle(data.name);
    setDescription(data.description);
    setColor(data.color);
    setType(data.type);
    setId(data.id);
  };
  // console.log(title);

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div
          onClick={() => {
            updateHandler(props.id);
          }}
        >
          <EditLocationIcon variant="contained" {...bindTrigger(popupState)} />

          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Box p={1}>
              <Typography className={classes.form}>
                <EditForm
                  id={id}
                  title={title}
                  description={description}
                  color={color}
                  type={type}
                  onfunction={props.onfunction}
                  popupState={!popupState}
                />
              </Typography>
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
