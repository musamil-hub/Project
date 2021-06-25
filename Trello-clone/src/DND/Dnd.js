import React, { useState } from "react";
import classes from "./Dnd.module.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import firebase from "../data/Firebase";
import PopoverPopupState from "../components/UpdateTask/editTask";

// Button
import EditLocationIcon from "@material-ui/icons/EditLocation";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
// Card
import { useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

const Dnd = (props) => {
  const [state, setState] = useState(props.datas);

  const [selectedid, setSelectedid] = useState();

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }
    const type = destination.droppableId;
    // console.log(type);
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    // Creating a copy of item before removing it from state
    const itemCopy = { ...state[source.droppableId].items[source.index] };
    // var userUid = firebase.auth().currentUser.itemCopy.id;
    console.log(itemCopy.name);
    setSelectedid(itemCopy.id);

    const objectupdate = {
      id: itemCopy.id,
      name: itemCopy.name,
      description: itemCopy.description,
      color: itemCopy.color,
      type: type,
      date: itemCopy.date,
    };

    if (itemCopy.id) {
      setupdateHandler(objectupdate, itemCopy.id);
    }

    setState((prev) => {
      prev = { ...prev };
      // Remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1);

      // Adding to new items array location
      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );

      return prev;
    });
  };

  // update firebase////////////////////////////////////////////////////////////////////////////////////update
  const setupdateHandler = (data, id) => {
    const firestore = firebase.database().ref("/treloo").child(id);
    console.log("update", data, typeof id, firestore);

    firestore.update(data);
  };
// Delete firebase
  const handledate = (id) => {
    console.log(id);
    const firestore = firebase.database().ref("/treloo").child(id);
    firestore.remove();
    props.onfunction();
  };
//////////////////////////////////////////////////////////////////////////////////////
// const updateHandler=(data) => {
//   console.log("update click");
//   console.log(data);
// }



  return (
    <div className={classes.App}>
      {/* <div>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
        <button onClick={addItem}>Add</button>
      </div> */}
      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data, key) => {
          return (
            <div key={key} className={classes.column}>
              <h3 className={classes.h3}>{data.title}</h3>
              <div className={classes.drag}>
                <Droppable droppableId={key}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={classes.droppablecol}
                      >
                        {data.items.map((el, index) => {
                          return (
                            <Draggable
                              key={el.id}
                              index={index}
                              draggableId={el.id}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    className={`item ${
                                      snapshot.isDragging && classes.dragging
                                    }`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <Card className={classes.root}>
                                      <div className={classes.details}>
                                        <div className={classes.controls}>
                                          <IconButton aria-label="Edit">
                                            <PopoverPopupState id={el} onfunction={props.onfunction} />
                                          </IconButton>
                                          <IconButton aria-label="Delete">
                                            <DeleteSharpIcon
                                              onClick={() => {
                                                handledate(el.id);
                                              }}
                                            />
                                          </IconButton>
                                          <span
                                            aria-label="date"
                                            className={classes.date}
                                          >
                                            {el.date}
                                          </span>
                                        </div>
                                        <CardContent
                                          className={classes.content}
                                        >
                                          <Typography
                                            component="h5"
                                            variant="h5"
                                            className={classes.title}
                                          >
                                            {el.name}
                                          </Typography>
                                          <Typography
                                            variant="subtitle1"
                                            color="textSecondary"
                                          >
                                            {el.description}
                                          </Typography>
                                        </CardContent>
                                      </div>
                                    </Card>

                                    <div className={classes.card}>
                                      <br />
                                    </div>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default Dnd;
