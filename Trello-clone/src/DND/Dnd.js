import React, { useState } from "react";
import classes from "./Dnd.module.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import { v4 } from "uuid";
const Dnd = (props) => {
  console.log("dnd");
  const [text, setText] = useState("");
  const [state, setState] = useState(props.datas);
  const handleDragEnd = ({ destination, source }) => {

    if (!destination) {
      return;
    }
    console.log(destination.droppableId);
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    // Creating a copy of item before removing it from state
    const itemCopy = { ...state[source.droppableId].items[source.index] };
    
    // update firbase
    console.log(itemCopy.name);




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

  const addItem = () => {
    setState((prev) => {
      return {
        ...prev,
        todo: {
          title: "Todo",
          items: [
            {
              id: v4(),
              name: text,
              description: text,
            },
            ...prev.todo.items,
          ],
        },
      };
    });

    setText("");
  };

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
                                // console.log(snapshot);
                                return (
                                  <div
                                    className={`item ${
                                      snapshot.isDragging && classes.dragging
                                    }`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <div className={classes.card}>
                                      {el.name}
                                      <br />
                                      {el.description}
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
