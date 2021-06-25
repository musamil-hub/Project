import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
// import _ from "lodash";
// import { v4 } from "uuid";
// import TrelloClone from "./components/TrelloClone";
import firebase from "./data/Firebase";
import Dnd from "./DND/Dnd";
import Loading from "./components/Loading/Loading";

// const itemsFromTodo = [
//   // { id: v4(), description: "First task", name: "Name 1" },
//   // { id: v4(), description: "Second task", name: "Name 2" },
// ];
// const itemsFromDoing = [
//   // { id: v4(), description: "Third task", name: "Name 3" },
//   // { id: v4(), description: "Fourth task", name: "Name 4" },
// ];
// // const itemsFromDone = [
// //   { id: v4(), description: "Fifth task", name: "Name 5" },
// //   { id: v4(), description: "Six task", name: "Name 6" },
// // ];

const DUMMY = {
  todo: {
    items: [],
    title: "Todo",
  },
  doing: {
    items: [],
    title: "Doing",
  },
  done: {
    items: [],
    title: "done",
  },
};
// const DUMMY2 = {
//   todo: {
//     title: "Todo",
//     items: [
//       {
//         id: "sdfhsdh-sngsxfn",
//         description: "First task",
//         name: "Name",
//       },
//       {
//         id: "sfdbf-eragfad",
//         description: "Second task",
//         name: "Name",
//       },
//     ],
//   },
//   doing: {
//     title: "Doing",
//     items: [
//       {
//         id: "dsfssv-asdvDF",
//         description: "Third task",
//         name: "Name",
//       },
//       {
//         id: "sdzvasdbf-sagrer",
//         description: "task",
//         name: "Name",
//       },
//     ],
//   },
//   done: {
//     title: "Done",
//     items: [
//       { id: "efvfdv-fgs", description: "Fifth task", name: "Name 5" },
//       { id: "dfsgsdhf-fbd", description: "Six task", name: "Name 6" },
//     ],
//   },
// };
function App() {
  // const [dummyData, setDummyData] = useState([]);
  const [state, setState] = useState(DUMMY);
  const [dnd, setDnd] = useState(false);

  // // FireBase
  const firebase = `https://trello-clone-v1-default-rtdb.firebaseio.com`;
  const json = `treloo.json`;
  const getdata = async () => {
    console.log("getdata");
    setState(DUMMY);
    setDnd(false);

    let dataarray = [];
    // const firestore = firebase.database().ref("/treloo");
    const response = await fetch(`${firebase}/${json}`);
    const data = await response.json();
    // firestore.on("value", (response) => {
    // const data = response.val();
    for (let i in data) {
      const datas = {
        id: i,
        name: data[i].name,
        description: data[i].description,
        color: data[i].color,
        type: data[i].type,
        date: data[i].date,
      };
      dataarray.push(datas);
    }
    // });
    let todoarr = [];
    let doingarr = [];
    let donearr = [];
    console.log(dataarray);
    dataarray.map((data) => {
      console.log(data);
      if (data.type == "todo") {
        todoarr.push(data);
      } else if (data.type == "doing") {
        doingarr.push(data);
      } else {
        donearr.push(data);
      }
    });
    setState((prev) => {
      return {
        todo: {
          items: todoarr,
          title: "Todo",
        },
        doing: {
          items: doingarr,
          title: "Doing",
        },
        done: {
          items: donearr,
          title: "Done",
        },
      };
    });

    setDnd(true);
    return dataarray;
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className=".App">
      <Header onfunction={getdata} />
      {!dnd && <Loading />}
      {dnd && <Dnd datas={state} onfunction={getdata} />}
    </div>
  );
}

export default App;
